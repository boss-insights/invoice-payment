export function getSessionCookie(cookieName) {
    let cookies = document.cookie.split(";"); // Split cookies by ';'
    
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim(); // Trim leading/trailing whitespace
      
      // Check if the cookie starts with the provided name
      if (cookie.indexOf(cookieName + "=") === 0) {
        // Return the cookie value (substring after the name and '=')
        return cookie.substring(cookieName.length + 1);
      }
    }
    
    // Return null if the cookie is not found
    return null;
  };

