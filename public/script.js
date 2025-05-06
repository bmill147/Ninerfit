async function fetchData(endpoint, elementId) {
    try {
      const res = await fetch(`http://localhost:3000/${endpoint}`)
      const data = await res.json()
      const container = document.getElementById(elementId)
      data.forEach(item => {
        const li = document.createElement('li')
        li.textContent = JSON.stringify(item)
        container.appendChild(li)
      })
    } catch (err) {
      console.error(`Error fetching ${endpoint}:`, err)
    }
  }
  
  fetchData('users', 'users')
  fetchData('workouts', 'workouts')
  fetchData('exercises', 'exercises')
  