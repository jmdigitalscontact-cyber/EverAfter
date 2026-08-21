(function () {
  "use strict";

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  const THEMES = {
    sage: {
      id: "sage",
      look: "Sage Garden",
      brand: "The Reyes–Cruz Wedding",
      namesHtml: 'Sofia <span class="amp">&amp;</span> Gabriel',
      names: "Sofia & Gabriel",
      bride: "Sofia",
      groom: "Gabriel",
      brideFull: "Sofia Reyes",
      groomFull: "Gabriel Cruz",
      dateLong: "Saturday, 20 June 2027",
      dateIso: "2027-06-20T14:00:00+08:00",
      ceremonyTime: "2:00 PM",
      ceremonyVenue: "Our Lady of Peace Parish",
      ceremonyAddr: "Makati, Metro Manila",
      receptionTime: "5:00 PM",
      receptionVenue: "The Garden at Alta Vista",
      receptionAddr: "Tagaytay, Cavite",
      motif: "Sage, champagne, and garden greens",
      bank: "BDO · Sofia Reyes · 00••••••1234",
      wallet: "GCash · 09•• ••• 4567",
    },
    blush: {
      id: "blush",
      look: "Champagne Blush",
      brand: "The Santos Wedding",
      namesHtml: 'Elena <span class="amp">&amp;</span> Marco',
      names: "Elena & Marco",
      bride: "Elena",
      groom: "Marco",
      brideFull: "Elena Santos",
      groomFull: "Marco Villanueva",
      dateLong: "Sunday, 14 February 2027",
      dateIso: "2027-02-14T15:00:00+08:00",
      ceremonyTime: "3:00 PM",
      ceremonyVenue: "San Agustin Church",
      ceremonyAddr: "Intramuros, Manila",
      receptionTime: "6:00 PM",
      receptionVenue: "The Peninsula Manila",
      receptionAddr: "Makati, Metro Manila",
      motif: "Blush, ivory, and champagne gold",
      bank: "BPI · Elena Santos · 00••••••8891",
      wallet: "Maya · 09•• ••• 2218",
    },
    navy: {
      id: "navy",
      look: "Midnight Velvet",
      brand: "Reyes & Tan",
      namesHtml: 'Camille <span class="amp">&amp;</span> Dominic',
      names: "Camille & Dominic",
      bride: "Camille",
      groom: "Dominic",
      brideFull: "Camille Reyes",
      groomFull: "Dominic Tan",
      dateLong: "Saturday, 12 December 2026",
      dateIso: "2026-12-12T16:00:00+08:00",
      ceremonyTime: "4:00 PM",
      ceremonyVenue: "Manila Cathedral",
      ceremonyAddr: "Intramuros, Manila",
      receptionTime: "7:00 PM",
      receptionVenue: "Shangri-La The Fort",
      receptionAddr: "Bonifacio Global City",
      motif: "Navy, ivory, and antique gold",
      bank: "UnionBank · Dominic Tan · 00••••••4402",
      wallet: "GCash · 09•• ••• 7740",
    },
    terra: {
      id: "terra",
      look: "Terracotta Olive",
      brand: "Hacienda Mendoza",
      namesHtml: 'Isla <span class="amp">&amp;</span> Mateo',
      names: "Isla & Mateo",
      bride: "Isla",
      groom: "Mateo",
      brideFull: "Isla Mendoza",
      groomFull: "Mateo Ramos",
      dateLong: "Saturday, 18 April 2027",
      dateIso: "2027-04-18T15:30:00+08:00",
      ceremonyTime: "3:30 PM",
      ceremonyVenue: "Sta. Maria Parish",
      ceremonyAddr: "Ilocos Sur",
      receptionTime: "6:00 PM",
      receptionVenue: "Hacienda garden",
      receptionAddr: "Batac, Ilocos Norte",
      motif: "Terracotta, olive, and warm cream",
      bank: "Metrobank · Mateo Ramos · 00••••••6510",
      wallet: "GCash · 09•• ••• 3381",
    },
    ink: {
      id: "ink",
      look: "Ivory & Ink",
      brand: "Lim & Cruz",
      namesHtml: 'Amara <span class="amp">&amp;</span> Julian',
      names: "Amara & Julian",
      bride: "Amara",
      groom: "Julian",
      brideFull: "Amara Lim",
      groomFull: "Julian Cruz",
      dateLong: "Sunday, 9 May 2027",
      dateIso: "2027-05-09T16:00:00+08:00",
      ceremonyTime: "4:00 PM",
      ceremonyVenue: "The Chapel at BGC",
      ceremonyAddr: "Bonifacio Global City",
      receptionTime: "6:30 PM",
      receptionVenue: "The Glasshouse",
      receptionAddr: "Taguig, Metro Manila",
      motif: "Charcoal, ivory, and warm gold",
      bank: "HSBC · Julian Cruz · 00••••••2199",
      wallet: "Maya · 09•• ••• 9054",
    },
  };

  const THEME_IDS = Object.keys(THEMES);

  function readTheme() {
    const fromUrl = new URLSearchParams(location.search).get("theme");
    const fromStore = localStorage.getItem("ea-theme");
    const id = fromUrl || fromStore || "sage";
    return THEME_IDS.includes(id) ? id : "sage";
  }

  function withTheme(href, themeId) {
    try {
      const url = new URL(href, location.href);
      const file = url.pathname.split("/").pop();
      if (!file.endsWith(".html")) return href;
      if (!url.searchParams.has("theme")) url.searchParams.set("theme", themeId);
      return file + url.search + url.hash;
    } catch {
      return href;
    }
  }

  function applyCopy(pack) {
    $$("[data-copy]").forEach((el) => {
      const key = el.dataset.copy;
      if (pack[key] == null) return;
      if (key === "namesHtml") el.innerHTML = pack[key];
      else el.textContent = pack[key];
    });
    const pageTitle = document.body?.dataset.pageTitle;
    if (pageTitle) document.title = pageTitle.replace("{names}", pack.names);
  }

  function toast(msg) {
    let el = $(".toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "toast";
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add("is-on");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.remove("is-on"), 2400);
  }

  function startCountdown(iso) {
    const root = $("#live-countdown");
    if (!root) return;
    const cells = {
      days: root.querySelector("[data-cd=days]"),
      hours: root.querySelector("[data-cd=hours]"),
      mins: root.querySelector("[data-cd=mins]"),
      secs: root.querySelector("[data-cd=secs]"),
    };
    const tick = () => {
      const diff = Math.max(0, new Date(iso).getTime() - Date.now());
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      if (cells.days) cells.days.textContent = String(days).padStart(2, "0");
      if (cells.hours) cells.hours.textContent = String(hours).padStart(2, "0");
      if (cells.mins) cells.mins.textContent = String(mins).padStart(2, "0");
      if (cells.secs) cells.secs.textContent = String(secs).padStart(2, "0");
    };
    tick();
    setInterval(tick, 1000);
  }

  const themeId = readTheme();
  const pack = THEMES[themeId];
  document.documentElement.setAttribute("data-theme", themeId);
  localStorage.setItem("ea-theme", themeId);
  applyCopy(pack);

  const themeSelect = $("#theme-select");
  if (themeSelect) {
    themeSelect.value = themeId;
    themeSelect.addEventListener("change", () => {
      const next = themeSelect.value;
      const url = new URL(location.href);
      url.searchParams.set("theme", next);
      location.href = url.toString();
    });
  }

  $$("a[href]").forEach((a) => {
    const href = a.getAttribute("href");
    if (!href || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("#")) return;
    if (!href.includes(".html")) return;
    a.setAttribute("href", withTheme(href, themeId));
  });

  startCountdown(pack.dateIso);

  function showPanel(id) {
    $$(".panel").forEach((el) => el.classList.toggle("is-on", el.id === id));
    $$(".admin-side button").forEach((btn) => {
      btn.classList.toggle("is-on", btn.dataset.panel === id);
    });
  }

  $$(".admin-side button").forEach((btn) => {
    btn.addEventListener("click", () => showPanel(btn.dataset.panel));
  });

  const rsvpLocked = $("#rsvp-locked");
  const rsvpForm = $("#rsvp-form");
  const rsvpDone = $("#rsvp-done");
  $("#unlock-rsvp")?.addEventListener("click", () => {
    rsvpLocked?.classList.add("hidden");
    rsvpForm?.classList.remove("hidden");
  });
  rsvpForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    rsvpForm.classList.add("hidden");
    rsvpDone?.classList.remove("hidden");
  });

  const recScreens = $$(".rec-screen");
  const recTabs = $$(".rec-tabs button");
  const recTabBar = $(".rec-tabs");
  const recOverlays = $$(".rec-overlay");

  function hideOverlays() {
    recOverlays.forEach((el) => el.classList.remove("is-on"));
  }

  function openRec(id) {
    hideOverlays();
    recScreens.forEach((el) => el.classList.toggle("is-on", el.id === id));
    recTabs.forEach((btn) => btn.classList.toggle("is-on", btn.dataset.screen === id));
    const appReady = !["rec-lock", "rec-welcome", "rec-vote"].includes(id);
    if (recTabBar) recTabBar.style.display = appReady ? "flex" : "none";
  }

  if (recTabBar) recTabBar.style.display = "none";
  recTabs.forEach((btn) => btn.addEventListener("click", () => openRec(btn.dataset.screen)));
  $("#rec-unlock")?.addEventListener("click", () => {
    $("#rec-lock")?.classList.remove("is-on");
    $("#rec-welcome")?.classList.add("is-on");
  });
  $("#rec-welcome-cta")?.addEventListener("click", () => {
    $("#rec-welcome")?.classList.remove("is-on");
    $("#rec-vote")?.classList.add("is-on");
  });
  $$("[data-team]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const team = btn.dataset.team;
      const status = $("#vote-status");
      if (status) {
        status.textContent =
          team === "bride"
            ? "You're on Team Bride. One vote, locked in."
            : "You're on Team Groom. One vote, locked in.";
      }
      $("#vote-results")?.classList.remove("hidden");
      $$("[data-team]").forEach((b) => {
        b.disabled = true;
        b.style.opacity = b.dataset.team === team ? "1" : "0.45";
      });
    });
  });
  $("#rec-find-seat")?.addEventListener("click", () => openRec("rec-search"));

  const searchInput = $("#guest-search");
  const searchOut = $("#search-out");
  const guests = [
    { name: pack.brideFull, table: 4, seat: 1 },
    { name: pack.groomFull, table: 4, seat: 2 },
    { name: "Ana Cruz", table: 7, seat: 3 },
    { name: "Miguel Santos", table: 7, seat: 4 },
    { name: "Lila Mendoza", table: 2, seat: 6 },
  ];
  searchInput?.addEventListener("input", () => {
    const q = searchInput.value.trim().toLowerCase();
    if (!searchOut) return;
    if (q.length < 2) {
      searchOut.innerHTML =
        "<p style='color:var(--rec-muted);font-size:0.85rem'>Type at least 2 letters of your name.</p>";
      return;
    }
    const hits = guests.filter((g) => g.name.toLowerCase().includes(q));
    searchOut.innerHTML = hits.length
      ? hits
          .map(
            (g) =>
              `<div class="seat-card"><div><strong>${g.name}</strong><div style="color:var(--rec-muted);font-size:0.8rem">Table ${g.table} · Seat ${g.seat}</div></div></div>`
          )
          .join("")
      : "<p style='color:var(--rec-muted);font-size:0.85rem'>No matches — try another spelling.</p>";
  });

  $("#gift-box")?.addEventListener("click", () => {
    $("#gift-details")?.classList.remove("hidden");
    const cta = $("#gift-cta");
    if (cta) cta.textContent = "Thank you";
  });

  $$(".menu-filters button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;
      $$(".menu-filters button").forEach((b) => b.classList.toggle("is-on", b === btn));
      $$(".menu-item").forEach((item) => {
        const tags = (item.dataset.tag || "").split(/\s+/);
        item.style.display = filter === "all" || tags.includes(filter) ? "" : "none";
      });
    });
  });

  $("#photo-snap")?.addEventListener("click", () => toast("In the live app this opens the camera. Photos compress to WebP on the phone."));
  $("#photo-gallery-btn")?.addEventListener("click", () => toast("Guests can also pick from their camera roll — JPEG, PNG, WebP, HEIC."));
  $$("[data-mock-action]").forEach((btn) => {
    btn.addEventListener("click", () => toast(btn.dataset.mockAction));
  });

  $("#couple-message-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    e.target.classList.add("hidden");
    $("#couple-message-done")?.classList.remove("hidden");
  });

  const bookImgs = $$(".book-frame img");
  let bookIndex = 0;
  function showBook(i) {
    bookImgs.forEach((img, idx) => {
      img.style.display = idx === i ? "block" : "none";
    });
    const label = $("#book-page-label");
    if (label && bookImgs.length) label.textContent = "Photo " + (i + 1) + " of " + bookImgs.length;
  }
  if (bookImgs.length) {
    showBook(0);
    $("#book-prev")?.addEventListener("click", () => {
      bookIndex = (bookIndex - 1 + bookImgs.length) % bookImgs.length;
      showBook(bookIndex);
    });
    $("#book-next")?.addEventListener("click", () => {
      bookIndex = (bookIndex + 1) % bookImgs.length;
      showBook(bookIndex);
    });
  }

  const wallImg = $("#wall-photo");
  const wallPhotos = [
    "assets/photos/pov-01.jpg",
    "assets/photos/pov-02.jpg",
    "assets/photos/pov-03.jpg",
    "assets/photos/pov-04.jpg",
    "assets/photos/gallery-04.jpg",
    "assets/photos/gallery-06.jpg",
  ];
  if (wallImg) {
    let w = 0;
    setInterval(() => {
      w = (w + 1) % wallPhotos.length;
      wallImg.src = wallPhotos[w];
    }, 4200);
  }
})();
