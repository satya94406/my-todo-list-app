import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../context/todoSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faClipboardList } from "@fortawesome/free-solid-svg-icons";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

function AddTodo() {
  const [todoName, setTodoName] = useState("");
  const [todoDate, setTodoDate] = useState("");
  const [todoPriority, setTodoPriority] = useState("Medium");
  const [isRecording, setIsRecording] = useState(false);

  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const { transcript, browserSupportsSpeechRecognition, resetTranscript } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <p>Your browser does not support speech recognition.</p>;
  }

  useEffect(() => {
    if (isRecording) {
      setTodoName(transcript);
    }
  }, [transcript, isRecording]);

  const handleMicrophoneClick = async () => {
    if (!isRecording) {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
      } catch (error) {
        alert("Microphone permission is required to use voice input.");
        return;
      }
    } else {
      SpeechRecognition.stopListening();
      resetTranscript();
    }
    setIsRecording(!isRecording);
  };

  const handleAddTodo = () => {
    if (todoName && todoDate) {
      dispatch(
        addTodo({
          id: Date.now(),
          todoName,
          todoDate,
          priority: todoPriority,
        })
      );
      setTodoName("");
      setTodoDate("");
      setTodoPriority("Medium");
    }
  };

  return (
    <div className="text-black shadow-xl rounded-2xl p-6 mb-6 bg-white">
      {/* ✅ Cool Header */}
      <div className="flex items-center gap-3 mb-6">
        <FontAwesomeIcon
          icon={faClipboardList}
          className="text-3xl text-blue-500"
        />
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
          Add New Task
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-6">
        {/* Todo Input with Microphone */}
        <div className="w-full lg:w-1/2">
          <label className="block mb-2 font-semibold text-gray-700">
            Todo Task
          </label>
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Enter todo here"
              value={todoName}
              onChange={(e) => setTodoName(e.target.value)}
              ref={inputRef}
              className="w-full py-3 pl-3 pr-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
            />
            <FontAwesomeIcon
              icon={faMicrophone}
              onClick={handleMicrophoneClick}
              className={`absolute right-3 top-3 text-2xl cursor-pointer transition-colors ${
                isRecording
                  ? "text-red-500 animate-pulse"
                  : "text-gray-500 hover:text-red-500"
              }`}
            />
          </div>
        </div>

        {/* Date Picker */}
        <div className="w-full lg:w-1/4">
          <label className="block mb-2 font-semibold text-gray-700">
            Due Date
          </label>
          <input
            id="todoDate"
            type="date"
            value={todoDate}
            onChange={(e) => setTodoDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
          />
        </div>

        {/* Priority Dropdown */}
        <div className="w-full lg:w-1/4">
          <label className="block mb-2 font-semibold text-gray-700">
            Priority
          </label>
          <select
            value={todoPriority}
            onChange={(e) => setTodoPriority(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
          >
            <option value="High">🔴 High</option>
            <option value="Medium">🟡 Medium</option>
            <option value="Low">🟢 Low</option>
          </select>
        </div>

        {/* Add Button */}
        <div className="w-full lg:w-1/4 mt-4 lg:mt-8">
          <button
            type="button"
            onClick={handleAddTodo}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:opacity-90 text-white font-bold py-3 px-6 rounded-full shadow-md transition duration-200"
          >
            + Add Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTodo;
