import React, { useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { FcSpeaker } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState(null);

  function searchWord() {
    if (!word.trim()) {
      toast.warn("Please enter a word", { theme: "colored" });
      return;
    }
    axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then((response) => {
        setMeaning(response.data[0]);
      })
      .catch(() => {
        toast.error("Word not found!", { theme: "colored" });
      });
  }

  function playAudio() {
    if (meaning?.phonetics?.[0]?.audio) {
      let audio = new Audio(meaning.phonetics[0].audio);
      audio.play();
    } else {
      toast.error("Audio not available for this word", { theme: "colored" });
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-r from-purple-500 via-indigo-500 to-blue-500 from-indigo-500 to-purple-700 p-6">
      <ToastContainer />
      <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-8 drop-shadow-lg text-center border-b-4 border-white pb-2">
        Ayush's Dictionary
      </h1>
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Enter a word..."
          className="px-4 py-3 w-64 sm:w-80 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-white text-lg"
        />
        <button
          onClick={searchWord}
          className="px-5 py-3 bg-white text-indigo-600 rounded-md shadow-md hover:bg-gray-200 transition-transform transform hover:scale-105 focus:outline-none"
        >
          <FaSearch size="22px" />
        </button>
      </div>

      {meaning && (
        <div className="bg-white p-6 rounded-lg shadow-2xl text-center max-w-md w-full animate-fade-in">
          <h1 className="text-2xl font-bold text-gray-800 mb-3 capitalize flex justify-center items-center border-b-2 border-gray-300 pb-2">
            {meaning.word}
            <button
              onClick={playAudio}
              className="ml-3 bg-blue-200 p-2 rounded-full shadow-md hover:bg-blue-500 transition-transform transform hover:scale-110"
            >
              <FcSpeaker size="25px" />
            </button>
          </h1>
          <div className="flex justify-between text-lg font-semibold mt-4">
            <span className="text-green-600">Part of Speech:</span>
            <span className="text-gray-600 font-semibold capitalize">{meaning.meanings[0]?.partOfSpeech}</span>
          </div>
          <div className="flex justify-between text-lg font-semibold mt-4">
            <span className="text-green-600">Definition:</span>
            <span className="text-gray-700 text-right font-semibold capitalize">{meaning.meanings[0]?.definitions[0]?.definition}</span>
          </div>
          {meaning.meanings[0]?.definitions[0]?.example && (
            <div className="flex justify-between text-lg font-semibold mt-4">
              <span className="text-green-600">Example:</span>
              <span className="text-gray-500 italic text-right">"{meaning.meanings[0]?.definitions[0]?.example}"</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
