import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  getSearchResults,
  setSearchResults,
  setErrorMessage,
} from "../../redux/home/homeState";
import { LuDownload } from "react-icons/lu";
import "./home.css";
import { Helmet } from "react-helmet";
import { saveAs } from "file-saver";
import axios from "axios";
import { TiArrowSortedUp } from "react-icons/ti";

const Home = ({
  getSearchResults,
  setSearchResults,
  searchResults,
  setErrorMessage,
  errorMessage,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchInputChange = (event) => {
    // Regular expression to validate YouTube video URL format
    setSearchQuery(event.target.value);
    // const youtubeUrlRegex =
    //   /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(?:-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|live\/|v\/)?)([\w\-]+)(\S+)?$/;
    const youtubeUrlRegex =
      /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(?:-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|live\/|v\/|shorts\/)?)([\w\-]+)(\S+)?$/;

    if (
      !youtubeUrlRegex.test(event.target.value) &&
      !(event.target.value === "")
    ) {
      setErrorMessage("Please enter a valid YouTube video URL.");
    } else {
      setErrorMessage(""); // Clear error message when input changes
    }
  };

  useEffect(() => {
    if (searchQuery) {
      getSearchResults({
        searchQuery: searchQuery,
      });
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const faqData = [
    {
      key: 1,
      question: "What is a YouTube Thumbnail Downloader?",
      answer:
        "A YouTube thumbnail downloader is a tool that allows you to download thumbnails of YouTube videos in the best quality. It is completely free to use without the need for any login. All you need to do is just paste the link and download it.",
    },
    {
      key: 2,
      question: "Is it legal to use a YouTube thumbnail downloader?",
      answer:
        "Yes. As of now, there are no laws that restrict the activities of a YouTube thumbnail downloader tool. However, it is not recommended to use others' thumbnails without the necessary permissions as it may result in copyright strikes.",
    },
    {
      key: 3,
      question: "How does the YouTube thumbnail downloader tool work?",
      answer:
        "The working mechanism of our YouTube thumbnail downloader is simple. As you paste the URL of your favorite thumbnail, the tool sends a request to YouTube's servers to fetch information about the video. Then, it displays the different resolution options of thumbnail images on the user interface for manual download. The entire process just takes a few seconds.",
    },
    {
      key: 4,
      question: "Does your tool work for YouTube Shorts or Live Streams?",
      answer:
        "You can download the thumbnails of YouTube live streams through our free thumbnail downloader. However, our tool does not support YouTube Shorts as of now. We are constantly updating the system, and we encourage you to stay tuned to the website to enjoy such extra features!",
    },
    // Add more FAQ items as needed
  ];

  const FaqItem = ({ item }) => (
    <div className="mb-4">
      <dt className="font-bold text-lg mb-2">{item.question}</dt>
      <dd>{item.answer}</dd>
    </div>
  );

  const handleDownloadClick = async (url, name) => {
    try {
      const response = await axios.get(
        `http://downloadyoutubethumbnail.org/download-image?imageUrl=${encodeURIComponent(
          url
        )}`,
        {
          responseType: "blob",
        }
      );
      saveAs(response.data, `${name}.jpg`);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`flex flex-col mt-10 w-full px-3 lg:px-0 h-full items-center justify-center text-center `}
    >
      <Helmet>
        <title>Thumbnails</title>
      </Helmet>
      <div className="flex !flex-row flex-col sm:flex-row items-center justify-center mt-12 mb-36 w-full">
        <div
          className={`relative flex items-center w-full sm:w-2/3 max-w-lg sm:mb-0 rounded-lg border border-gray-300 bg-white shadow-md overflow-hidden`}
        >
          <input
            type="search"
            name="search"
            placeholder="Paste YouTube Video Link"
            className={`bg-white h-12 px-5 pr-10 text-lg focus:outline-none flex-grow text-gray-700`}
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <button
            type="button"
            className="absolute right-0 top-0 p-3 px-3 flex items-center  text-gray-600 focus:outline-none"
          >
            <LuDownload className="text-xl" />
          </button>
        </div>
      </div>
      {errorMessage && (
        <p className="text-red-500 text-center -mt-36 mb-36">{errorMessage}</p>
      )}

      <div className="mb-16 -mt-20 flex bg-white shadow-md w-full max-w-xl mx-auto text-black">
        {!errorMessage &&
          searchResults &&
          searchResults.snippet &&
          searchResults.snippet.thumbnails && (
            <>
              <div className="flex items-center mr-5">
                <img
                  src={searchResults.snippet.thumbnails.high.url}
                  alt={searchResults.snippet.title}
                  className="mr-2 "
                />
              </div>
              <ul className="flex flex-col justify-between w-full">
                {Object.keys(searchResults.snippet.thumbnails)
                  .slice()
                  .reverse()
                  .map((key, index) => (
                    <li
                      key={key}
                      className={`mb-2 flex items-center p-2 ${
                        index === 0 ? "bg-blue-100" : "" // Apply background color to the first entry
                      }`}
                    >
                      <p className="font-semibold">
                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                      </p>
                      <p className="ml-2">
                        Size: {searchResults.snippet.thumbnails[key].width}x
                        {searchResults.snippet.thumbnails[key].height}
                      </p>
                      <button
                        className="ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded"
                        onClick={() =>
                          handleDownloadClick(
                            searchResults.snippet.thumbnails[key].url,
                            `Thumbnail_${searchResults.snippet.thumbnails[key].width}x${searchResults.snippet.thumbnails[key].height}`
                          )
                        }
                      >
                        Download
                      </button>
                    </li>
                  ))}
              </ul>
            </>
          )}
      </div>

      <div className="text-center mb-36">
        <p
          className={`text-3xl lg:text-5xl mb-16 font-extrabold text-gray-800`}
        >
          Lorem Ipsum
        </p>
        <p className="text-lg lg:text-md text-center font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat-. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>

      <div className="container mx-auto p-4 shadow-xl border p-6 mb-28 bg-[#FF0000] bg-opacity-10">
        <h2 className="text-3xl font-bold text-center mb-16">
          Frequently Asked Questions
        </h2>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {faqData.map((item) => (
            <FaqItem key={item.key} item={item} />
          ))}
        </dl>
      </div>
      <div className="w-full flex justify-end mb-2 mr-8">
        <button
          className="left-5 bg-[#FF0000] text-white rounded-full w-12 h-12 flex items-center justify-center shadow-md transition duration-300 hover:bg-red-600 focus:outline-none"
          onClick={scrollToTop}
        >
          <TiArrowSortedUp className="text-3xl" />
        </button>
      </div>

      <div className="h-12 bg-[#FF0000] w-full flex items-center justify-center">
        <p className="text-white">
          &copy; 2024 downloadyoutubethumbnail.org. All rights reserved.
        </p>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    ...state.home,
  };
}

const mapDispatchToProps = {
  getSearchResults: getSearchResults,
  setSearchResults: setSearchResults,
  setErrorMessage: setErrorMessage,
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
