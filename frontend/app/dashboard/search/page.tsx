"use client";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Head from "next/head";
import "./Search.css";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import Link from "next/link";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import DatePicker from 'react-datepicker';
import { FaUser, FaCalendarAlt, FaSearch, FaTimes, FaClock, FaInfoCircle, FaCamera, FaCheck, FaTimesCircle } from "react-icons/fa";

// Zod schema remains the same
const searchSchema = z.object({
    name: z.string().min(1, "Name is required"),
    startDateTime: z.string().optional(),
    endDateTime: z.string().optional(),
}).refine(
    (data) => {
        if (!data.startDateTime || !data.endDateTime) return true;
        const start = new Date(data.startDateTime).getTime();
        const end = new Date(data.endDateTime).getTime();
        return end > start && end - start <= 43_200_000;
    },
    {
        message: "The time range must be within 12 hours.",
        path: ["endDateTime"],
    }
);

type FormData = z.infer<typeof searchSchema>;

interface SearchResult {
    camera_name: string;
    message: string;
    success: boolean;
    timestamp_sec: string;
    url: string;
}

export default function SearchPage() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        startDateTime: "",
        endDateTime: "",
    });

    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [expandedResult, setExpandedResult] = useState<string | null>(null);
    const [searchPerformed, setSearchPerformed] = useState<boolean>(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [modalImage, setModalImage] = useState<string | null>(null);
    const [zoomed, setZoomed] = useState(false);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});
        const parsed = searchSchema.safeParse(formData);

        if (!parsed.success) {
            const fieldErrors: { [key: string]: string } = {};
            parsed.error.errors.forEach((err) => {
                if (err.path[0]) fieldErrors[err.path[0]] = err.message;
            });
            setErrors(fieldErrors);
            return;
        }

        setIsLoading(true);
        setSearchPerformed(true);

        try {
            const res = await fetch("http://localhost:5000/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(parsed.data),
            });

            if (!res.ok) throw new Error("API error");

            const apiResults = await res.json();
            const resultsArray = Array.isArray(apiResults)
                ? apiResults
                : apiResults
                    ? [apiResults]
                    : [];

            setSearchResults(resultsArray);
        } catch (error) {
            toast.error("Failed to fetch search results.");
            setSearchResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleExpandResult = (id: string) => {
        setExpandedResult(expandedResult === id ? null : id);
    };

    const clearSearch = () => {
        setFormData({
            name: "",
            startDateTime: "",
            endDateTime: "",
        });
        setSearchResults([]);
        setSearchPerformed(false);
        setErrors({});
        setStartDate(null);
        setEndDate(null);
    };

    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            startDateTime: startDate?.toISOString() || "",
            endDateTime: endDate?.toISOString() || "",
        }));
    }, [startDate, endDate]);

    return (
        <ProtectedRoute>
            <div className="container">
                <Head>
                    <title>Person Search | Surveillance System</title>
                    <meta name="description" content="Search for person appearances in surveillance footage" />
                </Head>
                <main className="main">
                    <div className="search-card">
                        <div className="search-header">
                            <h2>Person Search</h2>
                            <p className="search-subtitle">Search for appearances in surveillance footage</p>
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
                                            <FaSearch style={{ marginRight: '8px' }} />
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
                                        <FaTimes style={{ marginRight: '8px' }} />
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
                                <h3>Search Results</h3>
                                <div className="results-count">
                                    {searchResults.length} appearance{searchResults.length !== 1 ? 's' : ''} found
                                </div>
                            </div>

                            <div className="results-grid">
                                {searchResults.map((result, idx) => (
                                    <div key={`${result.camera_name}-${idx}`} className="result-card">
                                        <div className="result-header">
                                            <span className={`status-badge ${result.success ? 'success' : 'error'}`}>
                                                {result.success ? (
                                                    <>
                                                        <FaCheck style={{ marginRight: '4px' }} />
                                                        Found
                                                    </>
                                                ) : (
                                                    <>
                                                        <FaTimesCircle style={{ marginRight: '4px' }} />
                                                        Not Found
                                                    </>
                                                )}
                                            </span>
                                        </div>
                                        <div className="result-body">
                                            {result.url && (
                                                <div className="image-container">
                                                    <img
                                                        src={`/api/media/4_${result.url}`}
                                                        alt={`${result.camera_name} footage at ${result.timestamp_sec}`}
                                                        className="result-image"
                                                        onClick={() => setModalImage(`/api/media/4_${result.url}`)}
                                                    />
                                                    <div className="camera-info">
                                                        <FaCamera className="camera-icon" />
                                                        <span className="camera-name">{result.camera_name}</span>
                                                    </div>
                                                </div>
                                            )}
                                            <p className="result-message">
                                                <FaInfoCircle style={{ marginRight: '6px' }} />
                                                {result.message}
                                            </p>
                                            <div className="time-info">
                                                <span className="time-label">
                                                    <FaClock style={{ marginRight: '4px' }} />
                                                    Detected at:
                                                </span>
                                                <span className="timestamp">{result.timestamp_sec}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {modalImage && (
                        <div className="modal-overlay" onClick={() => { setModalImage(null); setZoomed(false); }}>
                            <div className="modal-content" onClick={e => e.stopPropagation()}>
                                <button
                                    className="modal-close"
                                    onClick={() => { setModalImage(null); setZoomed(false); }}
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