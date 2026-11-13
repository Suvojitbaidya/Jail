// app/dashboard/page.tsx
"use client"
import Navbar from "@/components/commons/Navbar"
import ProtectedRoute from "@/components/layout/ProtectedRoute"
import './PersonIdentification.css';

export default function PersonIdentification() {
  return (
    <ProtectedRoute>
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center mb-3">
              <h2 className="fw-bold mb-3">Person Identification</h2>
              <p className="lead text-muted">
                Verify individual identity with our secure identification system
              </p>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="identification-card bg-white">
                {/* Image with ID badge */}
                <div className="position-relative">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                    alt="Person photo"
                    className="person-image"
                  />
                  <div className="id-badge">ID</div>
                </div>

                {/* Identification details */}
                <div className="id-details">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h3 className="mb-0">Johnathan Doe</h3>
                      <span className="text-muted">ID: #EMP-2023-0456</span>
                    </div>
                    <span className="verification-badge verified">Verified</span>
                  </div>

                  {/* <hr />

                <div className="row">
                  <div className="col-md-6">
                    <div className="id-field">
                      <div className="id-label">Date of Birth</div>
                      <div className="id-value">15 March 1985</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="id-field">
                      <div className="id-label">Gender</div>
                      <div className="id-value">Male</div>
                    </div>
                  </div>
                </div>

                <div className="row mt-2">
                  <div className="col-md-6">
                    <div className="id-field">
                      <div className="id-label">Nationality</div>
                      <div className="id-value">United States</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="id-field">
                      <div className="id-label">ID Type</div>
                      <div className="id-value">Employee</div>
                    </div>
                  </div>
                </div>

                <div className="id-field mt-3">
                  <div className="id-label">Department</div>
                  <div className="id-value">Information Technology</div>
                </div>

                <div className="id-field">
                  <div className="id-label">Issued Date</div>
                  <div className="id-value">10 January 2023</div>
                </div>

                <div className="mt-4 pt-3 border-top">
                  <div className="row">
                    <div className="col-6">
                      <button className="btn btn-outline-primary w-100">
                        Request Verification
                      </button>
                    </div>
                    <div className="col-6">
                      <button className="btn btn-primary w-100">View Documents</button>
                    </div>
                  </div>
                </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ProtectedRoute>
  )
}
