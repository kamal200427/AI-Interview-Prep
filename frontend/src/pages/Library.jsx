import { useState } from "react";

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

import { searchResources } from "../services/ResourceApi.jsx";

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
  const [query, setQuery] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [youtubeResults, setYoutubeResults] =
    useState([]);

  const [pdfResults, setPdfResults] =
    useState([]);

  const [selectedType, setSelectedType] =
    useState("all");

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

  return (
    <div className="page">
      <Navbar authed />

      <main
        className="page-body container"
        style={{
          paddingTop: 36,
          paddingBottom: 60,
        }}
      >
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
        </div>

        {/* SUBJECT CHIPS */}

        <div className="chips">
          {[
            "DBMS",
            "DSA",
            "OOPS",
            "OS",
            "CN",
            "JAVA",
            "AIML",
          ].map((subject) => (
            <button
              key={subject}
              className="chip"
              onClick={() =>
                handleSearch(subject)
              }
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

            {loading && (
              <div className="loading-area">
                <div className="spinner" />
                Searching Resources...
              </div>
            )}

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
          </section>
        </div>
      </main>

      <FloatingAIBot />

      <Footer />
    </div>
  );
}