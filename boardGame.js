const player_2 = document.querySelector(".player-2");
const urlParams = new URLSearchParams(window.location.search);
const mode = urlParams.get("mode");

function updateAvatar() {
  const image = document.createElement("img");

  if (mode === "single") {
    image.src = "icons/AI.svg";
    player_2.insertBefore(image, player_2.firstChild);
  } else {
    image.src = "icons/player.svg";
    player_2.insertBefore(image, player_2.firstChild);
  }
}

updateAvatar();
