import React, { useEffect, useState } from "react";
import { getMyProfile, updateMyProfile } from "../../services/farmerService";
import { toast } from "react-toastify";

export default function FarmerProfile() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadProfile = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await getMyProfile(token);
      setProfile(res.data);
      setForm(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      localStorage.setItem("farmerId", String(res.data.farmerId));
      //console.log("data",res.data)
    } catch (err) {
      setError("Could not load your profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleChange = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const token = localStorage.getItem("token");
      const res = await updateMyProfile(token, form);
      setProfile(res.data);
      setForm(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      localStorage.setItem("farmerId", String(res.data.farmerId));
      setEditing(false);
      // setSuccess("Profile updated.");
      toast.success("Profile updated successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Could not update profile.");
      toast.error(err.response?.data?.message || "Could not update profile.");
    } finally {
      setSaving(false);
    }
  };

  const fieldstyle =
    "flex flex-col !min-w-[220px] gap-2 border border-gray-200 shadow-md hover:shadow-lg rounded-lg p-3 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500";

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Farmer</div>
          <h1 className="font-bold">My Profile</h1>
          <div className="page-subtitle">
            View and update your registered details.
          </div>
        </div>
      </div>

      {loading ? (
        <div className="card card-pad">
          <div className="loader-wrap">Loading profile…</div>
        </div>
      ) : error && !profile ? (
        <div className="card card-pad">
          <div className="alert alert-error">{error}</div>
          <button className="btn btn-outline" onClick={loadProfile}>
            Retry
          </button>
        </div>
      ) : (
        <div className="card card-pad">
          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap gap-2 justify-between">
              <div className={`field ${fieldstyle}`}>
                <label className="font-bold">Farmer ID</label>
                <input value={profile?.farmerId ?? ""} readOnly />
              </div>
              <div className={`field ${fieldstyle}`}>
                <label className="font-bold">Farmer code</label>
                <input value={profile?.farmerCode ?? ""} readOnly />
              </div>
              <div className={`field ${fieldstyle}`}>
                <label className="font-bold">Full name</label>
                <input
                  value={form?.farmerName ?? ""}
                  onChange={(e) => handleChange("farmerName", e.target.value)}
                  readOnly={!editing}
                  required
                />
              </div>
              <div className={`field ${fieldstyle}`}>
                <label className="font-bold">Phone number</label>
                <input
                  value={form?.mobileNo ?? ""}
                  onChange={(e) => handleChange("mobileNo", e.target.value)}
                  readOnly={!editing}
                />
              </div>
              <div className={`field ${fieldstyle}`}>
                <label className="font-bold">Address</label>
                <input
                  value={form?.address ?? ""}
                  onChange={(e) => handleChange("address", e.target.value)}
                  readOnly={!editing}
                />
              </div>

              <div className={`field ${fieldstyle} `}>
                <label className="font-bold ">Account status</label>
                <div
                  className={` flex items-center justify-between gap-2.5`}
                >
                  <span
                    className={`badge ${profile?.active ? "active" : "inactive"}`}
                  >
                    {profile?.active ? "ACTIVE" : "INACTIVE"}
                  </span>
                </div>
              </div>
            </div>

            {!editing && profile && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setEditing(true)}
              >
                Edit profile
              </button>
            )}

            {profile && profile.active === false && (
              <div className="alert alert-error mt-0">
                This account is inactive.
              </div>
            )}

            {editing && (
              <div className="btn-row">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={saving}
                >
                  {saving ? "Saving…" : "Save changes"}
                </button>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => {
                    setForm(profile);
                    setEditing(false);
                    setError("");
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
}
