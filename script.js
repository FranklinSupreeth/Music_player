const trendingSongs = [
    {
        id: 't1',
        title: 'Midnight Echoes',
        artist: 'Luna Ray',
        cover: 'C:/Users/frank/OneDrive/Desktop/New folder/Music player/imagesauto=format&fit=crop&w=800&q=80',
        isLiked: false,
        isPlaying: false
    },
    {
        id: 't2',
        title: 'Electric Dreams',
        artist: 'Neon Pulse',
        cover: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=800&q=80',
        isLiked: false,
        isPlaying: false
    },
    {
        id: 't3',
        title: 'Ocean Waves',
        artist: 'Coastal Beats',
        cover: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800&q=80',
        isLiked: false,
        isPlaying: false
    },
    {
        id: 't4',
        title: 'Sunset Boulevard',
        artist: 'Urban Tribe',
        cover: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800&q=80',
        isLiked: false,
        isPlaying: false
    }
];

// Data for all songs
const allSongs = [
    {
        id: 's1',
        title: 'Cosmic Journey',
        artist: 'Astral Harmonies',
        cover: 'https://images.unsplash.com/photo-1614149162883-504ce4d13909?auto=format&fit=crop&w=800&q=80',
        isLiked: false,
        isPlaying: false
    },
    {
        id: 's2',
        title: 'Urban Dreams',
        artist: 'City Beats',
        cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
        isLiked: false,
        isPlaying: false
    },
    {
        id: 's3',
        title: 'Twilight Echoes',
        artist: 'Night Owls',
        cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80',
        isLiked: false,
        isPlaying: false
    },
    {
        id: 's4',
        title: 'Rainy Day',
        artist: 'Ambient Sounds',
        cover: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=800&q=80',
        isLiked: false,
        isPlaying: false
    },
    {
        id: 's5',
        title: 'Desert Mirage',
        artist: 'Sand Dunes',
        cover: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
        isLiked: false,
        isPlaying: false
    }
];

// DOM Elements
const yearElement = document.getElementById('year');
const developerBtn = document.getElementById('developer-btn');
const developerModal = document.getElementById('developer-modal');
const closeBtn = document.querySelector('.close-btn');

// Initialize page 
document.addEventListener('DOMContentLoaded', function() {
    // Set copyright year
    yearElement.textContent = new Date().getFullYear();
    
    // Render music cards for home page
    if (document.querySelector('.music-grid:not(.trending-grid)')) {
        renderMusicCards(trendingSongs, '.music-grid:not(.trending-grid)');
    }
    
    // Render songs (for songs.html)
    if (document.querySelector('.songs-grid')) {
        renderMusicCards(allSongs, '.songs-grid');
    }
    
    // Setup event listeners for trending section on songs page 
    // (since we're using static HTML for those cards)
    if (document.querySelector('.trending-grid')) {
        setupMusicCardEvents();
    }
    
    // Modal events
    if (developerBtn) {
        developerBtn.addEventListener('click', openModal);
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === developerModal) {
            closeModal();
        }
    });
});

// Function to create music cards
function renderMusicCards(songs, containerSelector) {
    const container = document.querySelector(containerSelector);
    
    songs.forEach(song => {
        const card = createMusicCard(song);
        container.appendChild(card);
    });
    
    // Add event listeners to all play buttons and like buttons
    setupMusicCardEvents();
}

// Function to create a single music card
function createMusicCard(song) {
    const card = document.createElement('div');
    card.classList.add('music-card');
    card.dataset.id = song.id;
    
    card.innerHTML = `
        <div class="music-card-img">
            <img src="${song.cover}" alt="${song.title}">
            <div class="img-overlay"></div>
            <button class="play-btn" data-id="${song.id}">
                <i class="fas ${song.isPlaying ? 'fa-pause' : 'fa-play'}"></i>
            </button>
        </div>
        <div class="music-card-content">
            <div class="music-card-header">
                <div class="music-info">
                    <h3>${song.title}</h3>
                    <p>${song.artist}</p>
                </div>
                <button class="like-btn ${song.isLiked ? 'active' : ''}" data-id="${song.id}">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Setup event listeners for music card interactions
function setupMusicCardEvents() {
    // Play button click events
    document.querySelectorAll('.play-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const songId = this.dataset.id;
            togglePlayState(songId);
        });
    });
    
    // Like button click events
    document.querySelectorAll('.like-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const songId = this.dataset.id;
            toggleLikeState(songId);
        });
    });
}

// Toggle play state for a song
function togglePlayState(songId) {
    // Reset all songs to not playing
    resetAllPlayStates();
    
    // Find the targeted song
    let song;
    if (songId.startsWith('t')) {
        song = trendingSongs.find(s => s.id === songId);
    } else {
        song = allSongs.find(s => s.id === songId);
    }
    
    if (song) {
        // Toggle playing state
        song.isPlaying = !song.isPlaying;
        
        // Update UI
        const playBtn = document.querySelector(`.play-btn[data-id="${songId}"]`);
        if (playBtn) {
            playBtn.innerHTML = `<i class="fas ${song.isPlaying ? 'fa-pause' : 'fa-play'}"></i>`;
        }
        
        // Here you would also add logic to actually play/pause the audio
        console.log(`${song.isPlaying ? 'Playing' : 'Paused'}: ${song.title} by ${song.artist}`);
    }
}

// Reset all songs to not playing
function resetAllPlayStates() {
    // Reset trending songs
    trendingSongs.forEach(song => {
        song.isPlaying = false;
    });
    
    // Reset all songs
    allSongs.forEach(song => {
        song.isPlaying = false;
    });
    
    // Update all play buttons to show play icon
    document.querySelectorAll('.play-btn').forEach(btn => {
        btn.innerHTML = '<i class="fas fa-play"></i>';
    });
}

// Toggle like state for a song
function toggleLikeState(songId) {
    // Find the targeted song
    let song;
    if (songId.startsWith('t')) {
        song = trendingSongs.find(s => s.id === songId);
    } else {
        song = allSongs.find(s => s.id === songId);
    }
    
    if (song) {
        // Toggle liked state
        song.isLiked = !song.isLiked;
        
        // Update UI
        const likeBtn = document.querySelector(`.like-btn[data-id="${songId}"]`);
        if (likeBtn) {
            if (song.isLiked) {
                likeBtn.classList.add('active');
            } else {
                likeBtn.classList.remove('active');
            }
        }
        
        console.log(`${song.isLiked ? 'Liked' : 'Unliked'}: ${song.title} by ${song.artist}`);
    }
}

// Open developer modal
function openModal() {
    developerModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
}

// Close developer modal
function closeModal() {
    developerModal.classList.remove('active');
    document.body.style.overflow = ''; // Re-enable scrolling
}
// like 
document.querySelectorAll('.like-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('liked');
  });
});

