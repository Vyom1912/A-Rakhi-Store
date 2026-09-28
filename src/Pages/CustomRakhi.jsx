import React, { useContext, useEffect, useRef, useState } from "react";
import "./CSS/CustomRakhi.css";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import { MAKING_TIME, MOTI_COLOURS, THREAD_COLOUR, THREAD_HEX } from "../storeConfig";
import BeadPreview from "../Components/BeadPreview/BeadPreview";

let nextId = 1;
const newName = (values = {}) => ({ id: nextId++, text: "", spelling: "", qty: 1, ...values });

// names are woven in English capital letters only
const ENGLISH_NAME = /^[A-Z ]+$/;
const cleanName = (text) => text.trim().replace(/\s+/g, " ");

const CustomRakhi = () => {
  const { all_product, customItems, saveCustomItem, showToast } = useContext(ShopContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // "?edit=<key>" opens a custom rakhi from the cart, "?design=<id>" starts from a product
  const editing = customItems.find((item) => item.key === searchParams.get("edit"));
  const startProductId = editing ? editing.baseProductId : Number(searchParams.get("design"));

  const [names, setNames] = useState(() =>
    editing ? editing.names.map((name) => newName(name)) : [newName()]
  );
  const [baseProductId, setBaseProductId] = useState(
    all_product.some((p) => p.id === startProductId) ? startProductId : undefined
  );
  const [motiColour, setMotiColour] = useState(editing ? editing.motiColour : MOTI_COLOURS[0].name);
  const [instructions, setInstructions] = useState(editing ? editing.instructions : "");
  const [spellingChecked, setSpellingChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const lastNameInput = useRef(null);
  const focusNewName = useRef(false);

  const baseProduct = all_product.find((p) => p.id === baseProductId);
  const totalRakhis = names.reduce((sum, entry) => sum + entry.qty, 0);

  // after "Add another name", jump straight into the new name field
  useEffect(() => {
    if (focusNewName.current) {
      lastNameInput.current?.focus();
      focusNewName.current = false;
    }
  }, [names.length]);

  const clearError = (key) => setErrors((prev) => ({ ...prev, [key]: undefined }));

  const updateName = (id, changes) => {
    setNames((prev) => prev.map((entry) => (entry.id === id ? { ...entry, ...changes } : entry)));
    clearError(`name-${id}`);
  };
  const addName = () => {
    focusNewName.current = true;
    setNames((prev) => [...prev, newName()]);
  };
  const removeName = (id) => setNames((prev) => prev.filter((entry) => entry.id !== id));

  const validate = () => {
    const found = {};
    names.forEach((entry) => {
      const text = cleanName(entry.text);
      if (!text) found[`name-${entry.id}`] = "Please enter the name to weave.";
      else if (!ENGLISH_NAME.test(text)) {
        found[`name-${entry.id}`] = "Please use English letters (A–Z) only.";
      }
    });
    if (!spellingChecked) found.spelling = "Please confirm you have checked the spelling.";
    return found;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    const firstError = Object.keys(found)[0];
    if (firstError) {
      document
        .querySelector(`.custom-form [data-error="${firstError}"]`)
        ?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }
    saveCustomItem({
      key: editing?.key,
      names: names.map((entry) => ({
        text: cleanName(entry.text),
        spelling: entry.spelling.trim(),
        qty: entry.qty,
      })),
      motiColour,
      instructions: instructions.trim(),
      baseProductId,
    });
    showToast(editing ? "Custom rakhi updated" : "Custom rakhi added to cart");
    navigate("/cart");
  };

  return (
    <div className='custom-page'>
      <header className='custom-hero'>
        <p className='custom-hero-tag'>Made to order</p>
        <h1>Custom Name Rakhi</h1>
        <p>
          Tell us the names and we weave them with Jeco Moti beads on our maroon
          thread. Add as many names as you need, check the spelling, and add it
          to your cart.
        </p>
        <ol className='custom-steps'>
          <li>Add names</li>
          <li>Choose Moti colour</li>
          <li>Add to cart</li>
          <li>Order on WhatsApp</li>
        </ol>
      </header>

      <form className='custom-form' onSubmit={handleSubmit} noValidate>
        {/* ---------- 1. names ---------- */}
        <section className='custom-card'>
          <h2>
            <span className='custom-step-no'>1</span> Names to weave
          </h2>
          <p className='custom-card-intro'>
            English letters only. Add one entry for each different name, and use
            the quantity for more rakhis with the same name.
          </p>

          {names.map((entry, index) => (
            <div className='name-entry' key={entry.id} data-error={`name-${entry.id}`}>
              <div className='name-entry-head'>
                <b>Name {index + 1}</b>
                {names.length > 1 && (
                  <button type='button' className='name-entry-remove' onClick={() => removeName(entry.id)}>
                    Remove
                  </button>
                )}
              </div>

              <label className='field'>
                Name as it should appear
                <input
                  className='name-input'
                  ref={index === names.length - 1 ? lastNameInput : null}
                  value={entry.text}
                  onChange={(e) => updateName(entry.id, { text: e.target.value.toUpperCase() })}
                  placeholder='e.g. RAHUL'
                  lang='en'
                  autoCapitalize='characters'
                  autoComplete='off'
                  spellCheck='false'
                />
                {errors[`name-${entry.id}`] && (
                  <span className='field-error'>{errors[`name-${entry.id}`]}</span>
                )}
              </label>

              <BeadPreview text={cleanName(entry.text)} colour={motiColour} />

              <label className='field'>
                <span>
                  Spelling note <span className='field-optional'>(optional)</span>
                </span>
                <input
                  value={entry.spelling}
                  onChange={(e) => updateName(entry.id, { spelling: e.target.value })}
                  placeholder='e.g. R-A-H-U-L, not RAAHUL'
                />
              </label>

              <div className='name-entry-qty'>
                <span>Rakhis with this name</span>
                <div className='qty-stepper'>
                  <button
                    type='button'
                    onClick={() => updateName(entry.id, { qty: Math.max(1, entry.qty - 1) })}
                    aria-label='Fewer rakhis'>
                    −
                  </button>
                  <span>{entry.qty}</span>
                  <button
                    type='button'
                    onClick={() => updateName(entry.id, { qty: entry.qty + 1 })}
                    aria-label='More rakhis'>
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button type='button' className='btn btn-outline custom-add-name' onClick={addName}>
            + Add another name
          </button>
          <p className='field-hint'>
            Short names look best. If a long name needs a change, we ask you on
            WhatsApp before making it.
          </p>
        </section>

        {/* ---------- 2. thread & moti ---------- */}
        <section className='custom-card'>
          <h2>
            <span className='custom-step-no'>2</span> Thread &amp; Moti colour
          </h2>

          <div className='thread-fixed'>
            <span className='thread-swatch' style={{ "--thread": THREAD_HEX }} aria-hidden='true' />
            <span>
              <b>Thread: always {THREAD_COLOUR.toLowerCase()}</b>
              <small>Every custom rakhi is woven on our maroon thread.</small>
            </span>
          </div>

          {baseProduct && (
            <div className='base-design'>
              <img src={baseProduct.image} alt='' />
              <span>
                <b>Based on design #{baseProduct.id}</b>
                <small>{baseProduct.name}</small>
              </span>
              <button type='button' onClick={() => setBaseProductId(undefined)} aria-label='Remove design'>
                ×
              </button>
            </div>
          )}

          <fieldset className='moti-picker'>
            <legend>Moti (bead) colour for the letters</legend>
            <div className='moti-options'>
              {MOTI_COLOURS.map((colour) => (
                <label
                  key={colour.name}
                  className={`moti-option ${motiColour === colour.name ? "selected" : ""}`}>
                  <input
                    type='radio'
                    name='moti-colour'
                    value={colour.name}
                    checked={motiColour === colour.name}
                    onChange={() => setMotiColour(colour.name)}
                  />
                  {colour.photo ? (
                    <img src={colour.photo} alt={`${colour.name} Jeco Moti beads`} />
                  ) : (
                    <span className='moti-bead' style={{ "--bead": colour.hex }} aria-hidden='true' />
                  )}
                  <b>{colour.name}</b>
                  {colour.recommended && <small className='moti-recommended'>Recommended</small>}
                </label>
              ))}
            </div>
            <p className='field-hint'>
              Photos show our real beads. White looks best on the maroon thread.
              Want a mix of colours? Tell us in the instructions.
            </p>
          </fieldset>

          <label className='field'>
            <span>
              Instructions <span className='field-optional'>(optional)</span>
            </span>
            <textarea
              rows='3'
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder='e.g. first letter in yellow, add a small heart after the name'
            />
          </label>
        </section>

        {/* ---------- add to cart ---------- */}
        <div className='custom-submit'>
          <p className='custom-summary'>
            {names.length} name{names.length > 1 ? "s" : ""} · {totalRakhis} rakhi
            {totalRakhis > 1 ? "s" : ""} · {motiColour} Moti
          </p>
          <label className='custom-confirm' data-error='spelling'>
            <input
              type='checkbox'
              checked={spellingChecked}
              onChange={(e) => {
                setSpellingChecked(e.target.checked);
                clearError("spelling");
              }}
            />
            <span>
              I have checked the spelling of every name. Names are woven exactly
              as written above.
            </span>
          </label>
          {errors.spelling && <span className='field-error'>{errors.spelling}</span>}

          <button type='submit' className='btn'>
            {editing ? "Update cart" : "Add to cart"}
          </button>
          <p className='field-hint'>
            Next, in your cart, add your name and number and send the whole order
            on WhatsApp. The price depends on the names, so we confirm it on
            WhatsApp. Making takes {MAKING_TIME}.
          </p>
        </div>
      </form>
    </div>
  );
};

// start fresh whenever the link changes (e.g. from editing one cart item to a new rakhi)
const CustomRakhiPage = () => {
  const { search } = useLocation();
  return <CustomRakhi key={search} />;
};

export default CustomRakhiPage;
