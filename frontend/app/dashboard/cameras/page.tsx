import ProtectedRoute from "@/components/layout/ProtectedRoute";
import { Camera } from "@/lib/app/generated/prisma";
import { getAllCameras } from "@/lib/services/camera.service";
import { url } from "@/lib/url";
import { createServerAxios } from "@/lib/utils/axios/axiosServer";
import { getYouTubeVideoId } from "@/lib/utils/helper";
import { cookies } from "next/headers";
import { toast } from "react-hot-toast";
import Link from "next/link";

const Marquee = "marquee" as any;
export default async () => {
  const cookieStore: any = cookies();
  const token = cookieStore.get("token")?.value;
  const axios = createServerAxios(token);
  const { data } = await axios.get(url.cameras);

  return (
    <ProtectedRoute>
      {/* <!-- Main Dashboard --> */}
      <section className="container mt-4 mb-5 ps-4">
        <h2 className="mb-4 dashboard-title">Surveillance Dashboard</h2>

        <div className="row">
          <div className="col-md-9">
            <div className="tab-content" id="pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="pills-all"
                role="tabpanel"
              >
                <div className="d-flex justify-content-between align-items-center gap-5">
                  <h2 className="my-3 fs-3 flex-shrink-0 live-view-heading">
                    <i className="fas fa-circle live-icon"></i> Live View
                  </h2>
                  <div
                    id="alertMarquee"
                    style={{
                      display: "none",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Marquee
                      id="marqueeText"
                      behavior="scroll"
                      direction="left"
                    >
                      <i className="fas fa-exclamation-triangle text-danger"></i>
                      Camera 2{" "}
                      <span className="text-danger fw-bold">ALERT</span>
                    </Marquee>
                  </div>
                </div>
                <div className="row">
                  {data.data.length > 0 &&
                    data?.data?.map((d: Camera) => (
                      <div
                        key={d.id} // Added unique key prop here
                        className="col-md-6 mb-3 camera-card"
                        id="camera1"
                        style={{ display: "block" }}
                      >
                        <div className="card">
                          {d.cameraUrl && (
                            <iframe
                              width="100%"
                              height="300"
                              src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                                d.cameraUrl
                              )}?autoplay=1&mute=1`}
                              allowFullScreen
                            ></iframe>
                          )}
                          <div className="camera-info text-center p-2 bg-dark text-white">
                            {d.name}
                            <span className="bg-white text-danger px-2 ms-2">
                              {d.location == "wallside"
                                ? "Wall Side"
                                : "Normal"}
                            </span>
                          </div>
                          <Link
                            href={{
                              pathname: `/dashboard/cameras/${d.id}`,
                            }}
                          >
                            <button
                              className="btn-success btn fs-6 px-3 position-absolute top-0 end-0"
                              data-bs-toggle="modal"
                              data-bs-target="#imageModal"
                            >
                              <i className="fas fa-pen"></i>
                            </button>
                          </Link>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 mt-4">
            <div className="camera-list">
              <div className="d-flex justify-content-between align-items-center gap-5">
                <div id="alertMarquee">
                  <Marquee id="marqueeText" behavior="scroll" direction="left">
                    <i className="fas fa-exclamation-triangle text-danger"></i>
                    Camera 2{" "}
                    <span className="text-danger fw-bold alert_blink">
                      ALERT
                    </span>
                  </Marquee>
                </div>
                <span
                  id="selectAllText"
                  className="flex-shrink-0 btn btn-info text-white"
                >
                  Select All
                </span>
              </div>

              <div className="camera-item">
                <video className="camera-video" autoPlay muted loop>
                  <source
                    src="https://videos.pexels.com/video-files/8471681/8471681-uhd_2732_1440_25fps.mp4"
                    type="video/mp4"
                  />
                </video>
                <div className="camera-info">
                  <strong>Camera 1</strong>
                </div>
                <div className="flex-shrink-0">
                  <a
                    href="https://videos.pexels.com/video-files/8471681/8471681-uhd_2732_1440_25fps.mp4"
                    className="btn btn-sm btn-success flex-shrink-0"
                    data-fancybox="video"
                    data-caption="Camera 1"
                  >
                    <button className="btn btn-sm btn-success p-0">
                      <i className="fas fa-video camera-icon text-white fs-6"></i>{" "}
                      View
                    </button>
                  </a>
                  <div className="camera-status active">
                    <span className="blinking-dot"></span> Active
                  </div>
                </div>
                {/* <div className="ms-3" style={{ transform: "scale(1.5)" }}>
                  <label>
                    <input
                      type="checkbox"
                      className="camera-checkbox"
                      data-target="camera1"
                      checked
                    />
                  </label>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </ProtectedRoute>
  );
};