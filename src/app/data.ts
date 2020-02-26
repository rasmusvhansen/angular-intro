const videos = [
  {
    title: 'Angular in 60 Minutes',
    description: 'Learn angular in 60 minutes',
    thumb: 'https://i.ytimg.com/vi/KhzGSHNhnbI/mqdefault.jpg',
    link: 'https://www.youtube.com/watch?v=KhzGSHNhnbI'
  },
  {
    title: 'Angular vs React.js vs Vue.js - My Thoughts!',
    description:
      'Angular, React.js or Vue.js? I get this question a lot! Let me share some thoughts on it with you! ' +
      'Early bird offer - Join my course on this topic for only $10: ',
    thumb: 'https://i.ytimg.com/vi/KMX1mFEmM3E/mqdefault.jpg',
    link: 'https://www.youtube.com/watch?v=KMX1mFEmM3E'
  }
];

const API_KEY = 'paste your api key here, get a key at https://console.developers.google.com/apis/api/youtube.googleapis.com';
const baseUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&key=${API_KEY}&q=`;
