import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUserDetails } from "../../hooks/useUser.ts";
import "./UserDetails.scss";

const TABS = [
  "General Details",
  "Documents",
  "Bank Details",
  "Loans",
  "Savings",
  "App and System",
];

// star creation
const Stars = ({ filled, total = 3 }: { filled: number; total?: number }) => (
  <div className="stars" aria-label={`${filled} of ${total} stars`}>
    {Array.from({ length: total }, (_, i) => (
      <span key={i} className={i < filled ? "filled" : ""}>
        ★
      </span>
    ))}
  </div>
);

/* ── tiny helper components ── */
const Field = ({ label, value }: { label: string; value?: string | null }) => (
  <div className="user-details__field">
    <label>{label}</label>
    <p>{value}</p>
  </div>
);

function UserDetails() {
  const [tab, setTab] = useState(0);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { user, loading, error } = useUserDetails(id!);

  if (loading) return <p className="page-loader">Loading...</p>;
  if (error) return <p className="error-state">{error}</p>;

  return (
    <div className="user-details">
      {/* ── Back ── */}
      <button
        className="user-details__back"
        onClick={() => navigate("/dashboard/users")}
      >
        <img
          src="https://res.cloudinary.com/dhadohg2h/image/upload/v1779992256/np_back_3007750_000000_1_ye1zek.png"
          alt="backLogo"
        />
        Back to Users
      </button>

      {/* ── Heading row ── */}
      <div className="user-details__heading-row">
        <h1>User Details</h1>
        <div className="user-details__actions">
          <button className="user-details__btn user-details__btn--blacklist">
            Blacklist User
          </button>
          <button className="user-details__btn user-details__btn--activate">
            Activate User
          </button>
        </div>
      </div>

      {/* ── Profile card ── */}
      <div className="user-details__profile-card">
        {/* top row */}
        <div className="user-details__profile-top">
          {/* avatar */}
          <div className="user-details__avatar-wrap">
            <div className="user-details__avatar">
              <img
                src="https://res.cloudinary.com/dhadohg2h/image/upload/v1779991903/np_user_948637_000000_1_ivwrlg.png"
                alt="profileLogo"
              />
            </div>
          </div>

          {/* name */}
          <div className="user-details__name-block">
            <h2>{user?.username}</h2>
            <p>{user?.id}</p>
          </div>

          <div className="user-details__vdivider" />

          {/* tier */}
          <div className="user-details__tier">
            <p>User's Tier</p>
            <Stars filled={1} />
          </div>

          <div className="user-details__vdivider" />

          {/* balance */}
          <div className="user-details__balance-block">
            <h3>{user?.accountBalance}</h3>
            <p>{user?.accountNumber}/Providus Bank</p>
          </div>
        </div>

        {/* tabs */}
        <div className="user-details__tabs">
          {TABS.map((t, i) => (
            <button
              key={t}
              className={`user-details__tab${tab === i ? " user-details__tab--active" : ""}`}
              onClick={() => setTab(i)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* ── Details card ── */}
      <div className="user-details__details-card">
        {tab === 0 ? (
          <>
            {/* Personal Information */}
            <div className="user-details__section">
              <h3 className="user-details__section-title">
                Personal Information
              </h3>
              <div className="user-details__grid">
                <Field label="Full Name" value={user?.username} />
                <Field label="Phone Number" value={user?.phoneNumber} />
                <Field label="Email Address" value={user?.email} />
                <Field label="BVN" value={user?.profile?.bvn} />
                <Field label="Gender" value={user?.profile?.gender} />
                <Field
                  label="Marital Status"
                  value={user?.profile?.maritalStatus}
                />
                <Field label="Children" value={user?.profile?.children} />
                <Field
                  label="Type of Residence"
                  value={user?.profile?.typeOfResidence}
                />
              </div>
            </div>

            {/* Education & Employment */}
            <div className="user-details__section">
              <h3 className="user-details__section-title">
                Education and Employment
              </h3>
              <div className="user-details__education_grid">
                <Field
                  label="Level of Education"
                  value={user?.education?.level}
                />
                <Field
                  label="Employment Status"
                  value={user?.education?.employmentStatus}
                />
                <Field
                  label="Sector of Employment"
                  value={user?.education?.sector}
                />
                <Field
                  label="Duration of Employment"
                  value={user?.education?.duration}
                />
                <Field
                  label="Office Email"
                  value={user?.education?.officeEmail}
                />
                <Field
                  label="Monthly Income"
                  value={`${user?.education?.monthlyIncome[0]} - ${user?.education?.monthlyIncome[1]}`}
                />
                <Field
                  label="Loan Repayment"
                  value={user?.education?.loanRepayment}
                />
              </div>
            </div>

            {/* Socials */}
            <div className="user-details__section">
              <h3 className="user-details__section-title">Socials</h3>
              <div className="user-details__grid">
                <Field label="Twitter" value={user?.socials?.twitter} />
                <Field label="Facebook" value={user?.socials?.facebook} />
                <Field label="Instagram" value={user?.socials?.instagram} />
              </div>
            </div>

            {/* Guarantor */}
            <div className="user-details__section">
              <h3 className="user-details__section-title">Guarantor</h3>
              <div className="user-details__grid">
                <Field label="Full Name" value={user?.guarantor?.fullName} />
                <Field
                  label="Phone Number"
                  value={user?.guarantor?.phoneNumber}
                />
                <Field label="Email Address" value={user?.guarantor?.email} />
                <Field
                  label="Relationship"
                  value={user?.guarantor?.relationship}
                />
              </div>
            </div>
          </>
        ) : (
          <div className="user-details__empty-tab">
            No {TABS[tab]} data available yet.
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDetails;
