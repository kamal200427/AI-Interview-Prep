import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LibraryLoader from "../components/LibraryLoader";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import FloatingAIBot from "../components/FloatingAIBot.jsx";
import YoutubeResourceCard from "../components/YoutubeResourceCard";
import PdfResourceCard from "../components/PdfResourceCard";
import {
  Search,
  SlidersHorizontal,
  FileText,
  Download,
  ChevronLeft,
  ChevronRight,
  PlayCircle,
} from "lucide-react";

import { searchResources,saveResources } from "../services/ResourceApi.jsx";
import Sidebar from "../components/Sidebar.jsx";
import {
  getSavedRoadmap
} from "../services/RoadmapApi";

const filters = {
  Subject: [
    "DBMS",
    "DSA",
    "OOPS",
    "OS",
    "CN",
    "JAVA",
    "AIML",
  ],

  Type: [
    "YouTube",
    "PDF",
  ],
};

export default function Library() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [youtubeResults, setYoutubeResults] =
    useState([]);

  const [pdfResults, setPdfResults] =
    useState([]);

  const [selectedType, setSelectedType] =
    useState("all");
    const [roadmapSubjects,setRoadmapSubjects] =useState([]);
const [selectedChip, setSelectedChip] =
  useState("");
const [selectedResources,setSelectedResources]=useState("")
const [sidebarOpen, setSidebarOpen] = useState(true);
const toggleResource =
(resource) => {

  const exists =
    selectedResources.some(
      (r) =>
        r.link ===
        resource.link
    );

  if(exists){

    setSelectedResources(
      selectedResources.filter(
        (r) =>
          r.link !==
          resource.link
      )
    );

  } else {

    setSelectedResources([
      ...selectedResources,
      resource
    ]);

  }

};
 
  const handleSearch = async (
    customQuery = ""
  ) => {
    const searchText =
      customQuery || query;

    if (!searchText.trim()) return;

    setLoading(true);

    try {
      const data =
        await searchResources(searchText);
        console.log(data.pdfs);
        

      setYoutubeResults(
        data.youtube || []
      );

      setPdfResults(
        data.pdfs || []
      );
//save the search in local host
      localStorage.setItem(
      "libraryQuery",
      searchText
    );
    const youtube =
  data.youtube || [];

const pdfs =
  data.pdfs || [];
    localStorage.setItem(
      "libraryYoutube",
      JSON.stringify(
        youtube
      )
    );

    localStorage.setItem(
      "libraryPdfs",
      JSON.stringify(
        pdfs
      )
    );
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  const visibleYoutube =
    selectedType === "pdf"
      ? []
      : youtubeResults;

  const visiblePdf =
    selectedType === "youtube"
      ? []
      : pdfResults;
    useEffect(() => {
const savedQuery =
    localStorage.getItem(
      "libraryQuery"
    );

  const savedYoutube =
    localStorage.getItem(
      "libraryYoutube"
    );

  const savedPdfs =
    localStorage.getItem(
      "libraryPdfs"
    );
    if(savedQuery){

    setQuery(savedQuery);

  }

  if(savedYoutube){

    setYoutubeResults(
      JSON.parse(
        savedYoutube
      )
    );
  }
  if(savedPdfs){

    setPdfResults(
      JSON.parse(
        savedPdfs
      )
    );
  }
  if(savedQuery){

  setQuery(savedQuery);

  setSelectedChip(
    savedQuery
  );

}
  const loadSubjects =
  async () => {

    try{

      const user =
      JSON.parse(
        localStorage.getItem(
          "user"
        )
      );

      if(!user) return;

      const data =
      await getSavedRoadmap(
        user.email
      );

      setRoadmapSubjects(
        data.subjects || []
      );

    }
    catch(error){

      console.log(error);

    }

  };

  loadSubjects();

},[]);

  return (
    <div className="app-shell">

  <Sidebar  sidebarOpen={sidebarOpen} />

  <main className="app-main">

        {/* HEADER */}

        <h1
          style={{
            fontSize: 36,
            fontWeight: 800,
          }}
        >
          Knowledge Vault
        </h1>

        <p
          className="muted"
          style={{
            maxWidth: 650,
            marginTop: 10,
          }}
        >
          Access curated YouTube playlists,
          interview preparation PDFs,
          cheat sheets and learning
          resources.
        </p>

        {/* SEARCH */}

        <div className="library-search-row">

          <div className="library-search-box">
            <Search size={18} />

            <input
              value={query}
              onChange={(e) =>
                setQuery(e.target.value)
              }
              placeholder="Search DBMS Full Playlist, DSA Notes..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
          </div>

          <button
            className="search-btn"
            onClick={() => handleSearch()}
            disabled={loading}
          >
            {loading
              ? "Searching..."
              : "Search"}
          </button>
           
          <button
  className="search-btn"
  onClick={() => {

    localStorage.removeItem(
      "libraryQuery"
    );

    localStorage.removeItem(
      "libraryYoutube"
    );

    localStorage.removeItem(
      "libraryPdfs"
    );

    setQuery("");

    setYoutubeResults([]);

    setPdfResults([]);

  }}
>
  Clear
</button>

        </div>
            
        {/* SUBJECT CHIPS */}

        <div className="chips">
          {roadmapSubjects.map((subject) => (
            <button
              key={subject}
              className={`chip ${
    selectedChip === subject
      ? "chip-active"
      : ""
  }`}
               onClick={() => {

  // Same chip clicked again
  if(selectedChip === subject){

    setSelectedChip("");

    setQuery("");

    setYoutubeResults([]);

    setPdfResults([]);

    localStorage.removeItem(
      "libraryQuery"
    );

    localStorage.removeItem(
      "libraryYoutube"
    );

    localStorage.removeItem(
      "libraryPdfs"
    );

    return;
  }

  // New chip selected
  setSelectedChip(subject);

  setQuery(subject);

  handleSearch(subject);

}}
            >
              {subject}
            </button>
          ))}
        </div>

        {/* MAIN LAYOUT */}

        <div className="lib-layout">

          {/* FILTERS */}

          <aside className="filters">
            <h3>
              <SlidersHorizontal size={18} />
              Filters
            </h3>

            <div>
              <h4>Resource Type</h4>

              <label className="filter-opt">
                <input
                  type="radio"
                  checked={
                    selectedType === "all"
                  }
                  onChange={() =>
                    setSelectedType("all")
                  }
                />
                All
              </label>

              <label className="filter-opt">
                <input
                  type="radio"
                  checked={
                    selectedType ===
                    "youtube"
                  }
                  onChange={() =>
                    setSelectedType(
                      "youtube"
                    )
                  }
                />
                YouTube
              </label>

              <label className="filter-opt">
                <input
                  type="radio"
                  checked={
                    selectedType ===
                    "pdf"
                  }
                  onChange={() =>
                    setSelectedType("pdf")
                  }
                />
                PDF
              </label>
            </div>
          </aside>

          {/* RESULTS */}

          <section className="library-results">

            {/* LOADING */}

            {loading ? (

    <LibraryLoader />

) :(
  <>
            {/* EMPTY STATE */}

            {!loading &&
              youtubeResults.length ===
                0 &&
              pdfResults.length === 0 && (
                <div className="empty-library">
                  <div className="empty-icon">
                    📚
                  </div>

                  <h2>
                    Search Learning
                    Resources
                  </h2>

                  <p>
                    Search for DBMS,
                    DSA, OOPS, OS,
                    CN, JAVA, AIML
                    playlists and PDFs.
                  </p>
                </div>
              )}

            {/* YOUTUBE SECTION */}

            {visibleYoutube.length >
              0 && (
              <>
                <h2 className="resource-heading">
                  🎥 YouTube Playlists
                </h2>

                <div className="youtube-grid">

          {youtubeResults.map((video, index) => (

           <YoutubeResourceCard
         key={index}
         title={video.title}
      channel={video.channel_name}
       duration={video.duration}
       thumbnail={video.thumbnail}
       link={video.link}
       subject={query}
     />

      ))}

      </div>
              </>
            )}

            {/* PDF SECTION */}

            {visiblePdf.length > 0 && (
              <>
                <h2 className="resource-heading">
                  📄 PDF Resources
                </h2>

                <div className="pdf-grid">

                {pdfResults.map((pdf, index) => (

               <PdfResourceCard
             key={index}
           title={pdf.title}
           link={pdf.link}
           subject={query}
          />

        ))}

      </div>
              </>
            )}
            </>
          )}
          </section>
        </div>
         <div className="page-navigation">

    <button
        className="nav-btn previous-btn"
        onClick={() => navigate("/roadmaps")}
    >
        ← Previous
    </button>

    <button
        className="nav-btn next-btn"
        onClick={() => navigate("/course")}
    >
        Next →
    </button>

</div>
      </main>
      <FloatingAIBot />

      <Footer />
    </div>
  );
}