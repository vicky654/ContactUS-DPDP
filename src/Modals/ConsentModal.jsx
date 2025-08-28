import React, { useEffect, useState } from "react";
import Modal from "react-modal";

const languageMap = {
  English: "en",
  Hindi: "hi",
  Marathi: "mr",
  Punjabi: "pa",
  Gujarati: "gu",
  Bengali: "bn",
  Tamil: "ta",
  Telugu: "te",
  Kannada: "kn",
  Malayalam: "ml",
  Urdu: "ur",
  Assamese: "as",
  Odia: "or",
  Sindhi: "sd",
  Sanskrit: "sa",
  Manipuri: "mni",
  Konkani: "kok",
  Nepali: "ne",
  Bodo: "brx",
  Dogri: "doi",
  Santhali: "sat",
  Maithili: "mai",
};

const reverseLanguageMap = Object.entries(languageMap).reduce((acc, [label, code]) => {
  acc[code] = label;
  return acc;
}, {});

const ConsentModal = ({ visible, onClose, onAgree, lang, setLang, templateText }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (templateText && typeof templateText === "object") {
      const dropdownItems = Object.keys(templateText)
        .filter((lang) => languageMap[lang])
        .map((lang) => ({
          label: lang,
          value: languageMap[lang],
        }));
      setItems(dropdownItems);
    }
  }, [templateText]);

  const selectedLangName = reverseLanguageMap[lang];
  const selectedContentRaw = templateText?.[selectedLangName]?.content || "";
  const selectedContent = typeof selectedContentRaw === "string" ? selectedContentRaw : "";

  return (
    <Modal
      isOpen={visible}
      onRequestClose={onClose}
      ariaHideApp={false}
      className="bg-white rounded-xl shadow-lg max-w-2xl w-full mx-auto mt-20 p-6 overflow-hidden"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      {/* Language Selector */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Language:</label>
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">Select Language</option>
          {items.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold mb-3">Consent Notice</h2>

      {/* Content */}
      {selectedContent.length > 0 ? (
        <div
          className="border rounded-md p-3 max-h-80 overflow-y-auto mb-4 prose"
          dangerouslySetInnerHTML={{ __html: selectedContent }}
        />
      ) : (
        <p className="text-gray-500 text-sm mb-4">No content available for selected language.</p>
      )}

      {/* Actions */}
      <div className="flex justify-end space-x-3">
        <button
          onClick={onAgree}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Agree
        </button>
        <button
          onClick={onClose}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default ConsentModal;
