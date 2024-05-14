import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {
    getSearchResults, setSearchResults, setErrorMessage,
} from "../../redux/home/homeState";
import {LuDownload} from "react-icons/lu";
import "./home.css";
import {Helmet} from "react-helmet";
import {saveAs} from "file-saver";
import axios from "axios";
import {TiArrowSortedUp} from "react-icons/ti";

const Home = ({
                  getSearchResults, setSearchResults, searchResults, setErrorMessage, errorMessage,
              }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const handleSearchInputChange = (event) => {
        // Regular expression to validate YouTube video URL format
        setSearchQuery(event.target.value);
        // const youtubeUrlRegex =
        //   /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(?:-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|live\/|v\/)?)([\w\-]+)(\S+)?$/;
        const youtubeUrlRegex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(?:-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|live\/|v\/|shorts\/)?)([\w\-]+)(\S+)?$/;

        if (!youtubeUrlRegex.test(event.target.value) && !(event.target.value === "")) {
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

    const faqData = [{
        key: 1,
        question: "What is a YouTube Thumbnail Downloader?",
        answer: "A YouTube thumbnail downloader is a tool that allows you to download thumbnails of YouTube videos in the best quality. It is completely free to use without the need for any login. All you need to do is just paste the link and download it.",
    }, {
        key: 2,
        question: "Is it legal to use a YouTube thumbnail downloader?",
        answer: "Yes. As of now, there are no laws that restrict the activities of a YouTube thumbnail downloader tool. However, it is not recommended to use others' thumbnails without the necessary permissions as it may result in copyright strikes.",
    }, {
        key: 3,
        question: "How does the YouTube thumbnail downloader tool work?",
        answer: "The working mechanism of our YouTube thumbnail downloader is simple. As you paste the URL of your favorite thumbnail, the tool sends a request to YouTube's servers to fetch information about the video. Then, it displays the different resolution options of thumbnail images on the user interface for manual download. The entire process just takes a few seconds.",
    }, {
        key: 4,
        question: "Does your tool work for YouTube Shorts or Live Streams?",
        answer: "You can download the thumbnails of YouTube live streams through our free thumbnail downloader. However, our tool does not support YouTube Shorts as of now. We are constantly updating the system, and we encourage you to stay tuned to the website to enjoy such extra features!",
    }, // Add more FAQ items as needed
    ];

    const FaqItem = ({item}) => (<div className="mb-4">
        <dt className="font-bold text-lg mb-2">{item.question}</dt>
        <dd>{item.answer}</dd>
    </div>);

    const handleDownloadClick = async (url, name) => {
        try {
            const response = await axios.get(`http://downloadyoutubethumbnail.org/download-image?imageUrl=${encodeURIComponent(url)}`, {
                responseType: "blob",
            });
            saveAs(response.data, `${name}.jpg`);
        } catch (error) {
            console.error("Error downloading image:", error);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0, behavior: "smooth",
        });
    };

    return (<div
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
                    <LuDownload className="text-xl"/>
                </button>
            </div>
        </div>
        {errorMessage && (<p className="text-red-500 text-center -mt-36 mb-36">{errorMessage}</p>)}

        <div className="mb-16 -mt-20 flex bg-white shadow-md w-full max-w-xl mx-auto text-black">
            {!errorMessage && searchResults && searchResults.snippet && searchResults.snippet.thumbnails && (<>
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
                        .map((key, index) => (<li
                            key={key}
                            className={`mb-2 flex items-center p-2 ${index === 0 ? "bg-blue-100" : "" // Apply background color to the first entry
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
                                onClick={() => handleDownloadClick(searchResults.snippet.thumbnails[key].url, `Thumbnail_${searchResults.snippet.thumbnails[key].width}x${searchResults.snippet.thumbnails[key].height}`)}
                            >
                                Download
                            </button>
                        </li>))}
                </ul>
            </>)}
        </div>


        <div className="text-center mb-36">
            <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                "Don't judge a book by its cover," is indeed an outdated saying. All of us have an urge to pick the
                dress displayed in the front of the shop. Similarly, we all look at the pack of a product before
                buying it, right? And that's the case with YouTube, too.
            </p>
            <br/>
            <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                As per YouTube, <a href='https://support.google.com/youtube/answer/12340300?hl=en'>90%</a> of the
                best-performing YouTube videos have one thing in common: custom
                thumbnails. That means no matter how quality of content you deliver through the video, it will not
                attract the potential reach without having an eye-catching thumbnail.
            </p>
            <br/>
            <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                However, designing a thumbnail from scratch is challenging, especially for beginners. That's where
                our Free YouTube Thumbnail Downloader tool helps you. You can download your favorite video
                thumbnails for free and use them as you like. Check out everything you need to know about our
                brand-new YouTube thumbnail downloader tool.
            </p>
            <br/>
            <p
                className={`text-3xl font-extrabold text-gray-800`}
            >
                In this piece of content, we will cover:
            </p>
            <br/>
            <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                - Everything you need to know about our free YouTube thumbnail downloader
                <br/>
                <br/>
                - <a href='#basics'>All the basics about YouTube thumbnails, such as specifications and how to upload
                one</a>
                <br/>
                <br/>
                - <a href='#thumbnails'>The best practices for creating an exceptional YouTube thumbnail, with exampless</a>
            </p>
            <h1
                className={`text-3xl lg:text-5xl mb-16 mt-16 font-extrabold text-gray-800`}
            >
                About YouTube thumbnail downloader
            </h1>
            <h2
                className={`text-3xl font-extrabold text-gray-800`}
            >
                Why use a YouTube Thumbnail Downloader?
            </h2>
            <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                A common question might be flashing across your minds: why download a thumbnail if we can design it
                ourselves? Actually, it is not as simple as you might think. You need to have two things for that:
            </p>
            <ul>
                <li className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">&#8226; You
                    must be confident in your graphic designing skills and ensure that you can create a stunning
                    thumbnail that can stand out from thousands of other thumbnails.
                </li>
                <li className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">&#8226; You
                    must have enough time to devote to thumbnail creation and resources like the premium version of
                    designing software.
                </li>
            </ul>
            <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                Why crawl if you have the wings to fly? Here is how a YouTube thumbnail downloader can save you from
                such hassles:
            </p>
            <br/>
            <h2 className="text-lg lg:text-md font-medium mt-6 lg:mx-auto lg:max-w-3xl left"><b>1. Saves time</b>
            </h2>
            <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                A YouTube thumbnail downloader saves valuable time by allowing you to use existing thumbnails as
                templates. Instead of designing thumbnails from scratch, which can be time-consuming, you can
                download and repurpose existing thumbnails, reducing the process to half the time it would take.
            </p>
            <br/>
            <h2 className="text-lg lg:text-md font-medium mt-6 lg:mx-auto lg:max-w-3xl left"><b>2. Guaranteed
                Results</b></h2>
            <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                A thumbnail downloader allows you to identify and pick the YouTube thumbnails that have worked out
                among your target audience. By using them to create your own custom thumbnails, you will have more
                chances to stand out and attract viewers.
            </p>
            <br/>
            <h2 className="text-lg lg:text-md font-medium mt-6 lg:mx-auto lg:max-w-3xl left"><b>3. Website
                Design</b></h2>
            <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                Sometimes, website designers need to embed YouTube videos on a web page. Downloading a thumbnail
                helps them to use it as a placeholder until the user plays the video.
            </p>
            <h2 className="text-lg lg:text-md font-medium mt-6 lg:mx-auto lg:max-w-3xl left"><b>4. Save Money</b>
            </h2>
            <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                You need a premium version of a designing software like Adobe to create an excellent thumbnail
                design. If you don't have the necessary design skills, things get worse. You may have to outsource
                the work to a graphic designer on an hourly basis, starting from approximately <a
                href='https://www.upwork.com/hire/graphic-designers/cost/'>$15 per hour</a>. A
                YouTube thumbnail downloader tool saves all these costs by enabling you to download top-quality
                thumbnails for free.
            </p>
            <h1
                className={`text-3xl lg:text-5xl mb-16 mt-16 font-extrabold text-gray-800`}
            >
                Features of our YouTube Thumbnail Downloader
            </h1>
            <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                All tools have some features that set them apart from others. Our Free YouTube Thumbnail Downloader
                also comes up with a unique set of cool features to stand out from the competition. Check out them:
            </p>
            <h2 className="text-lg lg:text-md font-medium mt-6 lg:mx-auto lg:max-w-3xl left">
                <b>1. Easy To Use</b>
            </h2>
            <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                Unlike other tools, our YouTube Thumbnail Downloader is easy to use. Our interface is designed
                specifically for non-techies. All you need to do is just copy the link and choose the image quality.
                Rest is assured by our tool. The entire process just takes a few seconds.
            </p>

            <h2 className="text-lg lg:text-md font-medium mt-6 lg:mx-auto lg:max-w-3xl left">
                <b>2. Free</b>
            </h2>
            <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                Our YouTube Thumbnail Downloader tool is completely free to use. You can use it as much as you want
                without any restrictions or daily quotas. Then, you might think about suffocating ads that drain
                your time. Well, our tool is ad-free, too, and maintains a clean User Interface (UI) to facilitate
                you to download the thumbnail like a breeze.
            </p>


            <h2 className="text-lg lg:text-md font-medium mt-6 lg:mx-auto lg:max-w-3xl left">
                <b>3. Choose the Quality</b>
            </h2>
            <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                Image quality is a must to catch the attention of viewers. That's why we provide you the option to
                choose the quality of the thumbnail apart from other tools. It provides you with five options:
                Default, Medium, High, Standard, and Maxres, meaning at the highest resolution. And the best part is
                that all images are delivered in JPG format. That means you can directly upload the thumbnail to
                your channel, without the need for a third-party tool for conversion.
            </p>


            <h2 className="text-lg lg:text-md font-medium mt-6 lg:mx-auto lg:max-w-3xl left">
                <b>4. Convenience</b>
            </h2>
            <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                Our entire website is designed just for one purpose- to make the process of downloading YT
                thumbnails easier than ever before. You need not install any software or even log in to use the
                tool. Just enter the link and hit the download button. It's as simple as that.
                <br/><br/>The tool is mobile-optimized and compatible with all browsers. No matter what image
                quality you
                choose, it gets downloaded within seconds.

            </p>
            <h1
                className={`text-3xl lg:text-5xl mb-16 mt-16 font-extrabold text-gray-800`}
            >
                So, how to Download YouTube Thumbnails?
            </h1>
            <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                Gone are those days when you need to waste hours on designing a satisfying thumbnail. You can
                download your favorite thumbnail in just a matter of seconds with our YouTube thumbnail downloader.
                See how to use it:
            </p>
            <h2 className="text-lg lg:text-md font-medium mt-6 lg:mx-auto lg:max-w-3xl left">
                <b>
                    1. Copy the URL
                </b>
            </h2>
            <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                First of all, type in the topic of your video in the YouTube search bar and wait until a list of
                video thumbnails appears on the results page. Which one catches your eye? Click on your favourite
                thumbnail and copy the URL.
            </p>
            <h2 className="text-lg lg:text-md font-medium mt-6 lg:mx-auto lg:max-w-3xl left">
                <b>
                    2. Paste the URL
                </b>
            </h2>
            <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                Visit our website. Then, paste the URL in the blank field on the page.<br/>
                As soon as you paste the URL, the page displays five main quality options: Default, Medium, High,
                Standard, and Maxres. Choose the quality of the thumbnail you want. The better the quality is, the
                more eye-catching it is. However, keep in mind that the image size increases with quality. It is
                recommended to keep the thumbnail image size under 2MB.
            </p>
            <h2 className="text-lg lg:text-md font-medium mt-6 lg:mx-auto lg:max-w-3xl left">
                <b>
                    3. Download!
                </b>
            </h2>
            <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                Now, all you need to do is to hit the download button. The tool delivers the image in JPG format.
                Therefore, there is no need for any conversion. You can upload it directly for your video, ideally
                after making some changes to avoid any copyright issues, if the original thumbnail is not yours.
            </p>
            <h1 id='basics' className={`text-3xl lg:text-5xl mb-16 mt-16 font-extrabold text-gray-800`}>
                YouTube Thumbnails - The basics
            </h1>
            <h2 className="text-lg lg:text-md font-medium mt-6 lg:mx-auto lg:max-w-3xl left">
                <b>
                    What is a YouTube thumbnail?
                </b>
            </h2>
            <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                A YouTube thumbnail is a cover picture that appears on the search results page and the channel
                before anyone clicks to open the video. It suggests to the viewers about the type of content
                displayed through the video. As it is the first visual representation of a video that viewers see,
                content creators try to make it as eye-catching as possible to attract them to watch the video.
                Therefore, it plays a vital role in improving the click-through rates of a YouTube video.
            </p>
            <h2 className="text-lg lg:text-md font-medium mt-6 lg:mx-auto lg:max-w-3xl left">
                <b>
                    How to Upload a custom YouTube thumbnail?
                </b>
            </h2>
            <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                Despite knowing the importance, many beginners still don't upload custom YouTube thumbnails just
                because they don't know how to do it. Well, the process is simple and straightforward. Check out
                these steps:
            </p>
            <ol>
                <li><p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                    1. Login to your YouTube account. Click on the profile dropdown menu in the top right corner of
                    the home page and select Settings.
                </p></li>
                <li><p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                    2. Click on the channel status and features option. Configure the settings by clicking on the
                    'verify' button, if your channel is not verified yet. This is because only <a
                    href='https://support.google.com/youtube/answer/171664?hl=en'>verified YouTube
                    accounts</a> can upload custom thumbnails.
                </p></li>
                <li><p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                    3. Now, open the channel and select the 'upload video' option.
                </p></li>
                <li><p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                    4. Click on 'select files' to upload the video. Add the necessary details like title,
                    description, etc.
                </p></li>
                <li><p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                    5. After that, scroll down until you see an option to upload the thumbnail. Click on it and
                    select your desired image as the thumbnail.
                </p></li>
            </ol>
            <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                Remember, 90% of the highest performing YouTube videos have a custom thumbnail, so you don’t want to
                miss this step!
            </p>
            <h1 className={`text-3xl lg:text-5xl mb-16 mt-16 font-extrabold text-gray-800`}>
                Specifications of a YouTube Thumbnail
            </h1>
            <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                Considering the importance, a YouTube thumbnail is something that anyone can create out of the blue.
                There are some specifications suggested by YouTube itself regarding thumbnail uploading. Check out
                them:
            </p>
            <ul>
                <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                    <b>&#8226; Dimensions: </b>According to YouTube, the idle thumbnail size is 1280 pixels in width
                    by 720 pixels in height. However, if the size of the image is low, please avoid enlarging it, as
                    it kills the quality. Remember, the width of the video could be as low as 640 pixels.
                </p>
                <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                    <b>&#8226; Size limit: </b>It is always better to keep the size of the thumbnail below 2 MB. If
                    the size becomes larger, the loading speed of the video in the feed gets affected and naturally,
                    many viewers may turn back from clicking the video.
                </p>
                <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                    <b>&#8226; Aspect Ratio: </b>you may have uploaded images on social media platforms in various
                    ratios like 4:3, 1:1, 3:2, 2:3, etc. But when it comes to YouTube, things are quite different. A
                    16:9 aspect ratio is recommended for YouTube thumbnails.
                </p>
                <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                    <b>&#8226; File Format: </b>Prominent image formats like PNG, JPG, BMP, and GIF are supported on
                    YouTube. Apart from these, no other formats are allowed.
                </p>
                <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                    You can always find updated information about thumbnail requirements, such as file format and
                    aspect ratio, on <a href='https://support.google.com/youtube/answer/72431'>Google’s official
                    webpage</a> dedicated to the topic.
                </p>
                <h1 className={`text-3xl lg:text-5xl mb-16 mt-16 font-extrabold text-gray-800`}>
                    Why are Thumbnails so Important?
                </h1>
                <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                    With the rising competition in the video marketing field, thumbnails are becoming more important
                    than ever before. Here's how an excellent video thumbnail can help your business:
                </p>
                <h2 className="text-lg lg:text-md font-medium mt-6 lg:mx-auto lg:max-w-3xl left">
                    <b>
                        1. Improve your ranking on YouTube
                    </b>
                </h2>
                <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                    When you upload a video to YouTube, they place it on various spaces like homepage, search
                    results, recommendations, etc. The algorithm pushes forward the content to more feeds and ranks
                    it based on the performance of the video in these spaces. And a thumbnail plays a vital role in
                    creating an initial momentum for your video.
                    <br/><br/>An appealing thumbnail attracts the viewers to click and watch the video. On the flip
                    side, if you upload the same old cliche templates as thumbnails, viewers may not feel interested
                    in watching your video. As a result, the algorithm washes the hands of organically promoting
                    your video.
                </p>

                <h2 className="text-lg lg:text-md font-medium mt-6 lg:mx-auto lg:max-w-3xl left">
                    <b>
                        2. Build Brand Awareness
                    </b>
                </h2>
                <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                    Wondering how thumbnails contribute to brand awareness? Well, when the audience consistently
                    gets exposed to the same color palette and visual templates, they are more likely to recognize
                    your brand. Gradually, this will create brand loyalty and trust in your target audience. And
                    what's the result? As per stats, consistent brand representation can shoot up your revenue by
                    almost <a
                    href='https://info.marq.com/brand-consistency-thank-you?submissionGuid=350474a3-b128-4b74-b8e8-c13e5c81b8f2'>20%</a>.
                </p>

                <h2 className="text-lg lg:text-md font-medium mt-6 lg:mx-auto lg:max-w-3xl left">
                    <b>
                        3. Create Attraction
                    </b>
                </h2>
                <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                    As we all know, first impressions are the best ones. A well-designed thumbnail can create the
                    best impression. But is that crucial?
                    <br/><br/>Well, content quality matters the most, agreed. But is that the only factor? No matter
                    how quality content you come up with, if the thumbnail is not attractive, users won't click it.
                    Only a catchy thumbnail creates a sense of curiosity among the audience that makes them click
                    the video. No algorithm or quality factor can save you from that.

                </p>
                <h2 className="text-lg lg:text-md font-medium mt-6 lg:mx-auto lg:max-w-3xl left">
                    <b>
                        4. Describing the purpose
                    </b>
                </h2>

                <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                    While attracting viewers, it is important to ensure that you bring in the right audience. Why?
                    Well, there is no point in having an audience that clicks a video and exits in 3 seconds. In
                    fact, it increases the bounce rate and affects your video's ranking. Luckily, thumbnails help
                    you to avoid that situation.
                    <br/><br/>By designing professional thumbnails that stay relevant to the subject matter, you can
                    target the right kind of audience for the video. For instance, if your video is about the
                    'World’s Best Spaghetti Recipes', you must not add the thumbnail of a UFO abducting a plate of
                    Spaghetti just to make it eye-catching.
                </p>

                <h2 className="text-lg lg:text-md font-medium mt-6 lg:mx-auto lg:max-w-3xl left">
                    <b>
                        5. Competitive Edge
                    </b>
                </h2>
                <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                    With over one billion YouTube videos, it goes without saying that the platform has videos on
                    almost all topics. A unique and appealing thumbnail can create a competitive edge for your video
                    among the thousands of other videos.
                </p>
            </ul>
            <h1 id="thumbnails" className={`text-3xl lg:text-5xl mb-16 mt-16 font-extrabold text-gray-800`}>
                How to make great YouTube thumbnails
            </h1>

            <h2 className="text-lg lg:text-md font-medium mt-6 lg:mx-auto lg:max-w-3xl left">
                <b>
                    Best Practices for Creating a Great YouTube Thumbnail Image
                </b>
            </h2>
            <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                While uploading a video, YouTube gives you the opportunity to choose the thumbnail among four
                options. However, they are not as effective as custom thumbnails. But thumbnail designing is not
                something that could be done out of the blue. Just like video creation, it is an art with some
                principles and practices. Check out them:
            </p>
            <h2 className="text-lg lg:text-md font-medium mt-6 lg:mx-auto lg:max-w-3xl left">
                <b>
                    1. Make it Colorful
                </b>
            </h2>
            <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                There's a common factor in all appealing thumbnails: catchy colors! Even though black and gray
                backgrounds serve well, colors can draw the attention of viewers easily. If your brand has a uniform
                color palette, consider incorporating it into all your videos.
            </p>

            <h2 className="text-lg lg:text-md font-medium mt-6 lg:mx-auto lg:max-w-3xl left">
                <b>
                    2. Use a Screenshot
                </b>
            </h2>
            <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                Almost all thumbnails use a screenshot from the video to capture attention. It creates a genuine
                impression among the viewers to naturally drive them to the video. Make sure that the screenshot
                conveys a real emotion that is related to the video.
            </p>
            <h2 className="text-lg lg:text-md font-medium mt-6 lg:mx-auto lg:max-w-3xl left">
                <b>
                    3. Keep it Relevant
                </b>
            </h2>
            <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                YouTube thumbnails are not clickbait. If you put exaggerated or non-related thumbnails, the wrong
                type of audience would be attracted. And the result? The bounce rate for the video will skyrocket
                and the algorithm will stop promoting your video.
                <br/><br/>That's why it is important to create thumbnails that align with the subject matter of the
                video. Then, only you can target the right audience and improve the Key Performance Indicators
                (KPIs) of the videos like retention rate, engagement, etc.

            </p>
            <h2 className="text-lg lg:text-md font-medium mt-6 lg:mx-auto lg:max-w-3xl left">
                <b>
                    4. Consistency
                </b>
            </h2>
            <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                Just like any other strategy, consistency is indeed the key to making YouTube thumbnails. Try to
                stick to a specific style of thumbnail and keep it uniform across all your videos. Moreover, place
                your brand logo in each thumbnail. This way, when viewers see your video in the feed again, they are
                more likely to recognize your brand and click the video.

            </p>
            <h2 className="text-lg lg:text-md font-medium mt-6 lg:mx-auto lg:max-w-3xl left">
                <b>
                    5. Readability
                </b>
            </h2>
            <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                Even though attractive colors and images are useful, do not overuse them. Consider the fact that the
                number of senior citizens using YouTube is rising. Do not use overbright colors and ultra-stylish
                fonts that keep them away from reading. Make the font clear and simple.
            </p>
            <h2 className="text-lg lg:text-md font-medium mt-6 lg:mx-auto lg:max-w-3xl left">
                <b>
                    6. Precise Text
                </b>
            </h2>
            <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                Remember, most users are literally scrolling through the home feed or results page, looking for
                something that catches their eyes. And you've got an average attention span of just 3 seconds for
                that. Use it wisely with large highlighted fonts that capture the attention of viewers. Keep in mind
                that the size of the thumbnail is very small, so keep the text precise, ideally within 4-5 words.
            </p>
            <h2 className="text-lg lg:text-md font-medium mt-6 lg:mx-auto lg:max-w-3xl left">
                <b>
                    7. Create a Curiosity
                </b>
            </h2>
            <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                The primary purpose of a thumbnail is to create a spark of curiosity in the minds of viewers to urge
                them to click the video. A compelling thumbnail can create it simply by leaving doubt or mystery,
                piquing the viewer's interest, as LenosTube explains in <a
                href='https://www.lenostube.com/en/how-to-get-more-views-subscribers-youtube/'>this guide</a>.
                That's why you often come across
                thumbnails with cliffhanger moments and questions!

            </p>
            <h2 className="text-lg lg:text-md font-medium mt-6 lg:mx-auto lg:max-w-3xl left">
                <b>
                    8. Inspirations
                </b>
            </h2>
            <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                Sometimes, creativity gets completely exhausted and stares blankly. That's where you need to
                recharge it with an in-depth competitor analysis. Check out the YouTube channels of your same niche
                and see the pattern of their thumbnails. Download the most-viewed video thumbnails as a reference
                and feel free to test that style in your own videos, too.

            </p>
            <h2 className="text-lg lg:text-md font-medium mt-6 lg:mx-auto lg:max-w-3xl left">
                <b>
                    9. Experiment with compositions
                </b>
            </h2>
            <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                Try to abide by principles of composition like the rule of thirds to create a neat and balanced
                thumbnail that draws the viewer's eye to the most important elements. Instead of placing the subject
                or focal point in the center of the thumbnail, it's generally more visually appealing to position it
                along one of the intersection points or lines.
            </p>
            <h2 className="text-lg lg:text-md font-medium mt-6 lg:mx-auto lg:max-w-3xl left">
                <b>
                    10. Continue with testing
                </b>
            </h2>
            <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                Creating an attractive thumbnail is not just enough. You need to make sure that it is capable of
                bringing in results. For that, you must test your thumbnails through these three methods:
                <br/>
                <br/>

                &#8226; Try out A/B testing by creating two different versions of a thumbnail and see which one
                works better.
                <br/>
                <br/>
                &#8226; Watch the first-hour metrics of a specific thumbnail to measure its effectiveness.
                <br/>
                <br/>
                &#8226; Keep an eye on your competitors and download the thumbnails of their best-performing videos.
                Analyze them and adapt that style to your thumbnails.
            </p>
            <h1 className={`text-3xl lg:text-5xl mb-16 mt-16 font-extrabold text-gray-800`}>
                4 Best Tools for YouTube Thumbnail Designing
            </h1>
            <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                You may also consider using external tools and websites to help you craft a professional YouTube
                thumbnail with ease. Here are some of the best tools to design an excellent thumbnail:
            </p>
            <h2 className="text-lg lg:text-md font-medium mt-6 lg:mx-auto lg:max-w-3xl left">
                <b>
                    1. Canva
                </b>
            </h2>
            <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                Are you new to the design field? Then, <a href='https://www.canva.com/'>Canva</a> is a great option,
                as it comes with a lot of pre-made
                templates. You just need to type in the topic and choose the best one to edit. However, if you want
                to download the thumbnail in HQ, you will need to upgrade your plan to pro, costing about $12.99 per
                month (monthly subscription).

            </p>
            <h2 className="text-lg lg:text-md font-medium mt-6 lg:mx-auto lg:max-w-3xl left">
                <b>
                    2. TubePilot
                </b>
            </h2>
            <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                Yet another useful tool for thumbnail designing is <a href='https://tubepilot.ai/'>TubePilot</a>.
                While it does not offer a visual
                builder, it offers several 100% free tools that you may use to create an outstanding thumbnail, such
                as a “YouTube thumbnail text and font generator”, and a “YouTube thumbnail image generator”.
            </p>
            <h2 className="text-lg lg:text-md font-medium mt-6 lg:mx-auto lg:max-w-3xl left">
                <b>
                    3. Adobe Photoshop
                </b>
            </h2>
            <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                If you are a seasoned designer, who knows its way around with advanced color, blending and text
                effects, then using a professional app like <a
                href='https://www.adobe.com/products/photoshop.html'>Photoshop</a> is your best bet for creating a
                great
                thumbnail. However, it comes up with a subscription fee of almost $14.99 per month.

            </p>
            <h2 className="text-lg lg:text-md font-medium mt-6 lg:mx-auto lg:max-w-3xl left">
                <b>
                    4. Visme
                </b>
            </h2>
            <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                <a href='https://www.visme.co/'>Visme</a> is another versatile thumbnail designer tool that offers a
                wide range of templates and
                customization options. You can upload your own images and customize them with filters and effects.
                Even though it is free to use, advanced features are available only with a subscription, starting
                from $12.25 per month.
            </p>
            <h1 className={`text-3xl lg:text-5xl mb-16 mt-16 font-extrabold text-gray-800`}>
                Real-Life Examples of Best YouTube Thumbnails
            </h1>
            <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                You know everything about the density, depth, and flow of the river. But you don't know how to swim
                it. Is there any use? Well, here are some practical real-life examples that you can use as
                inspiration to create thumbnails that freeze the feeds of your target audience:
            </p>
            <h2 className="text-lg lg:text-md font-medium mt-6 lg:mx-auto lg:max-w-3xl left">
                <b>
                    1. Mr.Beast
                </b>
            </h2>
            <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                Mr.Beast is undoubtedly one of the biggest YouTubers in the world known for his stunts and challenges.
                But how many of you have noted a common success formula in his thumbnails? Well, he often uses
                thumbnails that are vibrant, colorful, and action-packed. Most times, the thumbnail depicts him in the
                midst of performing some Herculean task. In this case, he is shown struggling with a snake around his
                neck. And guess what? People are less likely to scroll forward when they see such eye-popping stills.
            </p>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/KOEfDvr4DcQ?si=eIzwuqLPpr3q_-Rc"
                    title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            <h2 className="text-lg lg:text-md font-medium mt-6 lg:mx-auto lg:max-w-3xl left">
                <b>
                    2. PewDiePie
                </b>
            </h2>
            <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                Yet another classic example of driving in viewers through attractive thumbnails is PewDiePie's YouTube
                Rewind 2018. It tries to create mystery among the audience by displaying mixed reactions of people. His
                cute and exaggerated joyful expression further stirs up a sense of suspense that hooks the viewers to
                open the video. As a result, the number of views of the video increases.
            </p>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/By_Cn5ixYLg?si=hDCeojDJAKZ-GDgM"
                    title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            <h2 className="text-lg lg:text-md font-medium mt-6 lg:mx-auto lg:max-w-3xl left">
                <b>
                    3. Casey Neistat
                </b>
            </h2>
            <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                When it comes to YouTube thumbnail creation, Casey takes a different approach. His thumbnails are
                usually devoid of text, focussing only on the compelling visuals to draw viewers in. It features raw and
                high-quality images of his daily life adventures giving a personal touch that aligns with his viewers.
                Simple yet effective, right?

            </p>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/a7NJ6Gek9v4?si=-LMxh56_SNYyfx0e"
                    title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            <h2 className="text-lg lg:text-md font-medium mt-6 lg:mx-auto lg:max-w-3xl left">
                <b>
                    4. VSauce
                </b>
            </h2>
            <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                VSauce is yet another YouTube channel that uses simple yet intriguing thumbnails to draw the attention
                of viewers. In this explanation video of Black Hole, VSauce places a relevant and to-the-point image. He
                doesn't add the image of an alien as a clickbait. And the result? He gains the right type of audience
                with trust in his channel instead of a bunch of frustrated negative comments.

            </p>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/3pAnRKD4raY?si=bVcCpy99NuUwz7pw"
                    title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

            <br/>
            <h1 className={`text-3xl lg:text-5xl mb-16 mt-16 font-extrabold text-gray-800`}>
                Final Words
            </h1>
            <p className="text-lg lg:text-md font-medium text-gray-500 mt-6 lg:mx-auto lg:max-w-3xl left">
                Even though everyone knows the importance of thumbnails, many content creators refrain from creating a
                custom thumbnail due to the effort and time involved. Well, stop making such lame excuses to limit your
                video reach with default thumbnails. Download and edit to create a high-quality custom thumbnail that
                truly attracts and converts your viewers. Use our free YouTube Thumbnail Downloader, whenever you want!

            </p>
        </div>


        <div className="container mx-auto p-4 shadow-xl border p-6 mb-28 bg-[#FF0000] bg-opacity-10">
            <h2 className="text-3xl font-bold text-center mb-16">
                Frequently Asked Questions
            </h2>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {faqData.map((item) => (<FaqItem key={item.key} item={item}/>))}
            </dl>
        </div>
        <div className="w-full flex justify-end mb-2 mr-8">
            <button
                className="left-5 bg-[#FF0000] text-white rounded-full w-12 h-12 flex items-center justify-center shadow-md transition duration-300 hover:bg-red-600 focus:outline-none"
                onClick={scrollToTop}
            >
                <TiArrowSortedUp className="text-3xl"/>
            </button>
        </div>

        <div className="h-12 bg-[#FF0000] w-full flex items-center justify-center">
            <p className="text-white">
                &copy; 2024 downloadyoutubethumbnail.org. All rights reserved.
            </p>
        </div>
    </div>);
};

function mapStateToProps(state) {
    return {
        ...state.home,
    };
}

const mapDispatchToProps = {
    getSearchResults: getSearchResults, setSearchResults: setSearchResults, setErrorMessage: setErrorMessage,
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
