import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth";
import { useQuery } from "react-query";
import { getJobs } from "../../api/customer";
import { useGenericMutation } from "../../hooks/useMutation";
import { addJob } from "../../api/user";
import { CustomerJob, ErrorResponse } from "../../types/types";
import { showToast } from "../../component/ui/toast";

const HistoryListing = () => {
  const { setAuthenticated, setUserData, user } = useAuthStore(
    (state) => state
  );
  const navigate = useNavigate();
  const { data, refetch } = useQuery(["getHistory"], getJobs);

  const { mutate: bookJob } = useGenericMutation<
    { message: string },
    ErrorResponse,
    {
      district: string;
      city: string;
      latitude: number;
      longitude: number;
      service_type: string;
      assigned_to_user: string;
      created_by_user: string;
    }
  >(addJob, {
    onSuccess: (data) => {
      showToast({
        variant: "success",
        message: data.data.message,
      });
      refetch();
    },
    onError: (error: ErrorResponse) => {
      showToast({
        variant: "error",
        message: error?.response?.data?.error || error.message,
      });
    },
  });

  useEffect(() => {
    const selectHeader = document.querySelector("#header");
    const onScroll = () => {
      window.scrollY > 100
        ? selectHeader?.classList.add("sticked")
        : selectHeader?.classList.remove("sticked");
    };

    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleRebook = (job: CustomerJob) => {
    bookJob({
      district: job.service_provider_district,
      city: job.service_provider_city,
      latitude: Number(job.service_provider_latitude),
      longitude: Number(job.service_provider_longitude),
      service_type: job.service_type,
      assigned_to_user: job?.assigned_to_user?.toString() || "",
      created_by_user: job?.created_by_user?.toString() || "",
    });
  };

  const signOut = () => {
    localStorage.removeItem("token");
    setAuthenticated(false);
    setUserData(null);
    navigate("/");
  };

  const { pathname } = useLocation();
  const location = pathname?.split("/")[1];

  return (
    <div className="main">
      <header
        id="header"
        className="header d-flex align-items-center fixed-top"
      >
        <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
          <Link to="/" className="logo d-flex align-items-center">
            <h1>RAPID REPAIRS</h1>
          </Link>
          <i className="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
          <i className="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>
          <nav id="navbar" className="navbar">
            <ul>
              <li>
                <Link to="/" className="active">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={location === "about" ? "active" : ""}
                >
                  About
                </Link>
              </li>
              <li>
                {user?.userType !== "service_provider" ? (
                  <Link
                    to="/services"
                    className={location === "services" ? "active" : ""}
                  >
                    Services
                  </Link>
                ) : (
                  <Link
                    to="/feedback"
                    className={location === "feedback" ? "active" : ""}
                  >
                    Feedback
                  </Link>
                )}
              </li>
              <li>
                {user?.userType === "service_provider" ? (
                  <Link
                    to="upcoming"
                    className={location === "upcoming" ? "active" : ""}
                  >
                    Upcoming Jobs
                  </Link>
                ) : (
                  <Link
                    to="history"
                    className={location === "history" ? "active" : ""}
                  >
                    History
                  </Link>
                )}
              </li>

              <li>
                <button className="get-a-quote" onClick={signOut}>
                  SIGN OUT
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main style={{ paddingBlock: 200 }}>
        <h3>Service History</h3>
        <table>
          <thead>
            <tr>
              <th>Service ID</th>
              <th>Service Provider</th>
              <th>Phone number</th>
              <th>Service Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {(data?.data || []).length !== 0 ? (
              data?.data?.map((item) => (
                <tr key={item.job_id}>
                  <td>{item.job_id}</td>
                  <td>{item.service_provider_name}</td>
                  <td>{item.service_provider_phone}</td>
                  <td>{item.service_type}</td>
                  <td className="flex flex-row items-center justify-between gap-4 px-2">
                    {item.status === "complete" ? "Completed" : item.status}
                    {item.status === "complete" ? (
                      <button
                        className="p-2 bg-slate-200 rounded-full hover:bg-slate-500"
                        onClick={() => handleRebook(item)}
                      >
                        <img src="/assets/img/repeat.png" className="h-8 w-8" />
                      </button>
                    ) : null}
                  </td>
                </tr>
              ))
            ) : (
              <p className="p-5 !pl-0">There is no data </p>
            )}
          </tbody>
        </table>
      </main>

      <footer id="footer" className="footer" style={{ marginTop: "40px" }}>
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-5 col-md-12 footer-info">
              <a href="index.html" className="logo d-flex align-items-center">
                <span>Rapid Repairs</span>
              </a>
              <p>
                Rapid Repairs, your one-stop Center for plumbing, carpentry,
                cleaning, Roofing, electrical and home painting needs.
              </p>
              <div className="social-links d-flex mt-4">
                <a href="#" className="twitter">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="#" className="facebook">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="instagram">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="#" className="linkedin">
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </div>

            <div className="col-lg-2 col-6 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">About us</a>
                </li>
                <li>
                  <a href="#">Services</a>
                </li>
              </ul>
            </div>

            <div className="col-lg-2 col-6 footer-links">
              <h4>Our Services</h4>
              <ul>
                <li>
                  <a href="#">Plumbing</a>
                </li>
                <li>
                  <a href="#">Carpentry</a>
                </li>
                <li>
                  <a href="#">Cleaning</a>
                </li>
                <li>
                  <a href="#">Home Painting</a>
                </li>
                <li>
                  <a href="#">Electrical works</a>
                </li>
                <li>
                  <a href="#">Roofing Repairs</a>
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
              <h4>We are</h4>
              <p>
                Team 10 <br />
                S6,CSE-B
                <br />
                SJCET,Palai <br />
                <br />
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HistoryListing;
