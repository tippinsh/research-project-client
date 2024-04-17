import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function ParticipantForm() {
  const [participantValues, setParticipantValues] = useState({
    ageRange: "",
    industry: "",
    selfKnowledgeAssessment: "",
  });
  const [participantId, setParticipantId] = useState(0);
  const [disableButton, setDisableButton] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParticipantValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const isDisabled =
      participantValues.ageRange === "" ||
      participantValues.industry === "" ||
      participantValues.selfKnowledgeAssessment === "";
    setDisableButton(isDisabled);
  }, [participantValues]);

  async function handleSubmit(e) {
    e.preventDefault();
    const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

    const participantValuesInt = {
      ageRange: parseInt(participantValues.ageRange),
      industry: participantValues.industry,
      selfKnowledgeAssessment: parseInt(
        participantValues.selfKnowledgeAssessment,
      ),
    };

    const response = await fetch(`https://${baseUrl}/api/participant`, {
      method: "POST",
      body: JSON.stringify(participantValuesInt),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setDisableButton(true);

    const resData = await response.json();
    if (!response.ok) {
      throw new Error("Failed to update participant data");
    }

    const newParticipantId = resData.id;
    setParticipantId(newParticipantId);
    localStorage.setItem("participantId", newParticipantId);
  }

  return (
    <div className="w-full">
      <form className="max-w-sm mx-auto" method="post" onSubmit={handleSubmit}>
        <label
          htmlFor="ageRange"
          className="block mb-2 text-md font-medium text-offwhite"
        >
          Select your age range
        </label>
        <select
          id="ageRange"
          name="ageRange"
          value={participantValues.ageRange}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
        >
          <option value="" disabled>
            Select...
          </option>
          <option value={0}>18-24</option>
          <option value={1}>25-34</option>
          <option value={2}>35-44</option>
          <option value={3}>45-54</option>
          <option value={4}>55-64</option>
          <option value={5}>65 and over</option>
        </select>
        <label
          htmlFor="industry"
          className="block mb-2 text-md font-medium text-offwhite"
        >
          What industry do you work in?
        </label>
        <select
          id="industry"
          name="industry"
          value={participantValues.industry}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
        >
          <option value="" disabled>
            Select...
          </option>
          <option>Accountancy, banking and finance</option>
          <option>Business, consulting and management</option>
          <option>Charity and voluntary work</option>
          <option>Creative arts and design</option>
          <option>Energy and utilities</option>
          <option>Engineering and manufacturing</option>
          <option>Environment and agriculture</option>
          <option>Healthcare</option>
          <option>Hospitality and events management</option>
          <option>Information technology</option>
          <option>Law</option>
          <option>Law enforcement and security</option>
          <option>Leisure, sport and tourism</option>
          <option>Marketing, advertising and PR</option>
          <option>Property and construction</option>
          <option>Public services and admin</option>
          <option>Recruitment and HR</option>
          <option>Retail</option>
          <option>Sales</option>
          <option>Science and pharmaceuticals</option>
          <option>Social care</option>
          <option>Teacher training and education</option>
          <option>Transport and logistics</option>
          <option>Retired</option>
          <option>Unemployed</option>
        </select>
        <label
          htmlFor="selfKnowledgeAssessment"
          className="block mb-2 text-md font-medium text-offwhite"
        >
          What would you rate your ability to identify AI-generated images?
        </label>
        <select
          id="selfKnowledgeAssessment"
          name="selfKnowledgeAssessment"
          value={participantValues.selfKnowledgeAssessment}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
        >
          <option value="" disabled>
            Select...
          </option>
          <option value={0}>Excellent</option>
          <option value={1}>Very good</option>
          <option value={2}>Good</option>
          <option value={3}>Fair</option>
          <option value={4}>Poor</option>
          <option value={5}>
            I&apos;ve never seen an AI generated image before
          </option>
        </select>
        {participantId === 0 && (
          <button
            type="submit"
            disabled={disableButton}
            className="mt-4 hover:text-white border w-full hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 border-gray-600 text-white"
          >
            Submit
          </button>
        )}
        {participantId > 0 && (
          <Link
            to={{
              pathname: "/survey",
            }}
          >
            <button
              type="button"
              className="mt-4 hover:text-white border w-full hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 border-gray-600 text-white"
            >
              Next
            </button>
          </Link>
        )}
      </form>
    </div>
  );
}

export default ParticipantForm;
