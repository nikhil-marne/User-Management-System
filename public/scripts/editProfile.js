// Preview profile image before upload
document
  .getElementById("profileImageInput")
  .addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (file) {
      document.getElementById("fileName").textContent = file.name;

      const reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("profileImagePreview").src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

// Toggle password visibility
function togglePassword(fieldId) {
  const field = document.getElementById(fieldId);
  const button = field.nextElementSibling;

  if (field.type === "password") {
    field.type = "text";
    button.textContent = "Hide";
  } else {
    field.type = "password";
    button.textContent = "Show";
  }
}

// Form submission
document
  .getElementById("editProfileForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const successMsg = document.getElementById("successMessage");
    const errorMsg = document.getElementById("errorMessage");
    successMsg.style.display = "none";
    errorMsg.style.display = "none";

    // Validate passwords match
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (newPassword && newPassword !== confirmPassword) {
      errorMsg.textContent = "New passwords do not match!";
      errorMsg.style.display = "block";
      return;
    }

    // Create FormData for file upload
    const formData = new FormData(this);

    try {
      const response = await fetch("/api/update-profile", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        successMsg.style.display = "block";

        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          globalThis.location.href = "/dashboard";
        }, 2000);
      } else {
        errorMsg.textContent = data.message || "Failed to update profile";
        errorMsg.style.display = "block";
      }
    } catch (error) {
      console.error("Update error:", error);
      errorMsg.textContent = "An error occurred. Please try again.";
      errorMsg.style.display = "block";
    }
  });
