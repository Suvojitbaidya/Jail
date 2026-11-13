"use client";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Head from "next/head";
import "./Search.css";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import { z } from "zod";
import { toast } from "react-hot-toast";
import { FaUser, FaCalendarAlt, FaSearch, FaTimes, FaClock, FaCamera, FaCheck } from "react-icons/fa";
import DatePicker from "react-datepicker";
import Zoom from "react-medium-image-zoom";
import 'react-medium-image-zoom/dist/styles.css';

// Zod schema for validation
const searchSchema = z.object({
  name: z.string().min(1, "Name is required"),
  startDateTime: z.string().optional(),
  endDateTime: z.string().optional(),
}).refine(
  (data) => {
    if (!data.startDateTime || !data.endDateTime) return true;
    const start = new Date(data.startDateTime).getTime();
    const end = new Date(data.endDateTime).getTime();
    return end > start && end - start <= 43_200_000; // max 12 hours
  },
  {
    message: "The time range must be within 12 hours.",
    path: ["endDateTime"],
  }
);

// API response types
interface SearchItem {
  camera: string;
  filename: string;
  time: string;
}

interface ApiResponse {
  message: string;
  result: SearchItem[];
  success: boolean;
  target: string;
}

type FormData = z.infer<typeof searchSchema>;

// ✅ Format date into local string (YYYY-MM-DD HH:mm:ss)
const formatDateTime = (date: Date) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ` +
    `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
};

export default function SearchPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    startDateTime: undefined,
    endDateTime: undefined,
  });

  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // ✅ Update formData when datepickers change (using local time format)
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      startDateTime: startDate ? formatDateTime(startDate) : undefined,
      endDateTime: endDate ? formatDateTime(endDate) : undefined,
    }));
  }, [startDate, endDate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const clearSearch = () => {
    setFormData({
      name: "",
      startDateTime: undefined,
      endDateTime: undefined,
    });
    setSearchResults([]);
    setSearchPerformed(false);
    setErrors({});
    setStartDate(null);
    setEndDate(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    const parsed = searchSchema.safeParse(formData);

    if (!parsed.success) {
      const fieldErrors: { [key: string]: string } = {};
      parsed.error.errors.forEach(err => {
        if (err.path[0]) fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    // Prepare payload
    const payload: any = { name: parsed.data.name };
    if (parsed.data.startDateTime) payload.startDateTime = parsed.data.startDateTime;
    if (parsed.data.endDateTime) payload.endDateTime = parsed.data.endDateTime;

    setIsLoading(true);
    setSearchPerformed(true);

    try {
      const res = await fetch("http://localhost:5000/verify",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("API error");

      const apiData: ApiResponse = await res.json();

      if (apiData.success) {
        setSearchResults(apiData.result);
      } else {
        toast.error("No appearances found.");
        setSearchResults([]);
      }
    } catch (error) {
      toast.error("Failed to fetch search results.");
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="container">
        <Head>
          <title>Person Search | Surveillance System</title>
          <meta
            name="description"
            content="Search for person appearances in surveillance footage"
          />
        </Head>

        <main className="main">
          <div className="search-card">
            <div className="search-header">
              <h2>Person Search</h2>
              <p className="search-subtitle">
                Search for appearances in surveillance footage
              </p>
            </div>
            <form onSubmit={handleSubmit} className="search-form">
              <div className="form-group">
                <label htmlFor="name">Name or ID</label>
                <div className="input-with-icon">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter full name or ID"
                    required
                  />
                </div>
                {errors.name && (
                  <span className="error-message">{errors.name}</span>
                )}
              </div>

              <div className="time-range">
                <div className="form-group datepicker-group">
                  <label htmlFor="startDateTime">From</label>
                  <div className="datepicker-wrapper">
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      showTimeSelect
                      dateFormat="MMMM d, yyyy h:mm aa"
                      placeholderText="Select start date"
                      className="custom-datepicker"
                      timeIntervals={15}
                      popperPlacement="bottom-start"
                    />
                    <span className="calendar-icon">
                      <FaCalendarAlt />
                    </span>
                  </div>
                  {errors.startDateTime && (
                    <span className="error-message">{errors.startDateTime}</span>
                  )}
                </div>

                <div className="form-group datepicker-group">
                  <label htmlFor="endDateTime">To</label>
                  <div className="datepicker-wrapper">
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      showTimeSelect
                      dateFormat="MMMM d, yyyy h:mm aa"
                      placeholderText="Select end date"
                      className="custom-datepicker"
                      timeIntervals={15}
                      popperPlacement="bottom-start"
                      minDate={startDate ?? undefined}
                    />
                    <span className="calendar-icon">
                      <FaCalendarAlt />
                    </span>
                  </div>
                  {errors.endDateTime && (
                    <span className="error-message">{errors.endDateTime}</span>
                  )}
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  className="submit-button"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="button-spinner"></span>
                      Searching...
                    </>
                  ) : (
                    <>
                      <FaSearch style={{ marginRight: "8px" }} />
                      Search Appearances
                    </>
                  )}
                </button>
                {searchPerformed && (
                  <button
                    type="button"
                    className="clear-button"
                    onClick={clearSearch}
                    disabled={isLoading}
                  >
                    <FaTimes style={{ marginRight: "8px" }} />
                    Clear Search
                  </button>
                )}
              </div>
            </form>
          </div>

          {isLoading && (
            <div className="loading-overlay">
              <div className="spinner"></div>
              <p>Searching surveillance footage...</p>
              <div className="loading-progress">
                <div className="progress-bar"></div>
              </div>
            </div>
          )}

          {searchResults.length > 0 && (
            <div className="results-section">
              <div className="results-header">
                <h3>Search Results for "{formData.name}"</h3>
                <div className="results-count">
                  {searchResults.length} appearance
                  {searchResults.length !== 1 ? "s" : ""} found
                </div>
              </div>

              <div className="results-grid">
                {searchResults.map((result, idx) => (
                  <div key={`${result.camera}-${idx}`} className="result-card">
                    <div className="result-header">
                      <span className={`status-badge success`}>
                        <FaCheck style={{ marginRight: "4px" }} />
                        Found
                      </span>
                    </div>
                    <div className="result-body">
                      <div className="image-container">
                        <img
                          src={`/api/media/4_${result.filename}`}
                          alt={`${result.camera} footage at ${result.time}`}
                          className="result-image"
                          onClick={() =>
                            setModalImage(`/api/media/4_${result.filename}`)
                          }
                        />
                        <div className="camera-info">
                          <FaCamera className="camera-icon" />
                          <span className="camera-name">{result.camera}</span>
                        </div>
                      </div>
                      <div className="time-info">
                        <span className="time-label">
                          <FaClock style={{ marginRight: "4px" }} />
                          Detected at:
                        </span>
                        <span className="timestamp">{new Date(result.time).toLocaleString("en-IN", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                          hour12: true,
                          timeZone: "Asia/Kolkata",
                        })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {modalImage && (
            <div
              className="modal-overlay"
              onClick={() => setModalImage(null)}
            >
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="modal-close"
                  onClick={() => setModalImage(null)}
                >
                  <FaTimes />
                </button>
                <Zoom>
                  <img
                    src={modalImage}
                    alt="Big Preview"
                    className="modal-image"
                    style={{ maxWidth: "80vw", maxHeight: "70vh" }}
                  />
                </Zoom>
              </div>
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
