async function deleteUser(id) {
  try {
    const response = await fetch(`/user/delete/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      const element = document.getElementById(id);
      if (element) element.style.display = "none";
    } else {
      alert(`❌Error: ${response.statusText}`);
    }
  } catch (error) {
    alert("API ERROR !");
    console.log(`Error : ${error}`);
  }
}
