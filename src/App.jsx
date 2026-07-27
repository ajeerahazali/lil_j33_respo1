import React, { useEffect, useMemo, useState } from 'react';

const moods = [
  {
    id: 'sad',
    label: 'Sad',
    tone: 'The quiet heart is still welcome here.',
    themeClass: 'theme-sad',
    pokemonName: 'Crying Cubone',
    pokemonPower: 'soft rain power',
    sprite:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/104.gif',
    auraClass: 'pokemon-sad',
    welcome:
      'Cubone stays beside sorrow without rushing it away. Let the feeling be named, and the next step will come gently.',
  },
  {
    id: 'angry',
    label: 'Angry',
    tone: 'Even fire can be guided into a clear path.',
    themeClass: 'theme-angry',
    pokemonName: 'Charizard',
    pokemonPower: 'steady flame power',
    sprite:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/6.gif',
    auraClass: 'pokemon-angry',
    welcome:
      'Charizard teaches strong energy to breathe before it burns. Strength becomes clearer when it is held with care.',
  },
  {
    id: 'happy',
    label: 'Happy',
    tone: 'Warm light can be shared without losing its glow.',
    themeClass: 'theme-happy',
    pokemonName: 'Pikachu',
    pokemonPower: 'bright spark power',
    sprite:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/25.gif',
    auraClass: 'pokemon-happy',
    welcome:
      'Pikachu keeps joy playful and bright. Let this good energy move with purpose, not hurry.',
  },
  {
    id: 'anxious',
    label: 'Anxious',
    tone: 'A restless mind can still be led back to shore.',
    themeClass: 'theme-anxious',
    pokemonName: 'Psyduck',
    pokemonPower: 'ripple focus power',
    sprite:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/54.gif',
    auraClass: 'pokemon-anxious',
    welcome:
      'Psyduck knows the noise of a crowded mind. With patience, even swirling thoughts can settle into rhythm.',
  },
];

const activityMap = {
  sad: {
    low: ['Wrap up in something soft', 'Take three slower breaths', 'Sit by a window for one minute'],
    medium: ['Write one kind sentence to yourself', 'Play one gentle song', 'Stretch your arms and hands'],
    high: ['Take a short outside walk', 'Message yourself one hopeful note', 'Tidy one small area nearby'],
  },
  angry: {
    low: ['Sit quietly for two minutes', 'Loosen your shoulders', 'Sip a glass of water'],
    medium: ['Take five slow breaths', 'Write one strong feeling on paper', 'Stretch your neck and hands'],
    high: ['Walk around the room', 'Do a one-minute shake-out', 'Name five things you can see'],
  },
  happy: {
    low: ['Stay still for a calm minute', 'Notice one thing going well', 'Keep breathing slowly'],
    medium: ['Write one kind note to yourself', 'Take a short stretch break', 'Choose your next small step'],
    high: ['Take a short energizing walk', 'Play one calming song', 'Tidy one small spot nearby'],
  },
  anxious: {
    low: ['Hold something warm', 'Count five slow breaths', 'Read a short calming line'],
    medium: ['Name three sounds around you', 'Relax your jaw and hands', 'Press your feet into the floor'],
    high: ['Do box breathing for one minute', 'Walk slowly for thirty seconds', 'Look around and name colors'],
  },
};

const activityQuotes = {
  'Wrap up in something soft': 'Soft moments still count as progress.',
  'Take three slower breaths': 'A slower breath can make more room inside your mind.',
  'Sit by a window for one minute': 'Even a quiet pause can help the day feel lighter.',
  'Write one kind sentence to yourself': 'The way you speak to yourself matters.',
  'Play one gentle song': 'Small comfort is still real comfort.',
  'Stretch your arms and hands': 'A little movement can loosen a heavy moment.',
  'Take a short outside walk': 'A change of space can soften a hard feeling.',
  'Message yourself one hopeful note': 'Hope can start as one simple sentence.',
  'Tidy one small area nearby': 'A tiny reset can help your mind feel clearer.',
  'Sit quietly for two minutes': 'Stillness can be enough for now.',
  'Loosen your shoulders': 'Your body can help tell your mind it is safe to ease up.',
  'Sip a glass of water': 'Care can start with one basic step.',
  'Take five slow breaths': 'You do not have to solve everything in this minute.',
  'Write one strong feeling on paper': 'Naming the fire can help it cool into clarity.',
  'Stretch your neck and hands': 'Release often begins in small places.',
  'Walk around the room': 'Motion can help break the grip of stress.',
  'Do a one-minute shake-out': 'You can let some tension leave your body.',
  'Name five things you can see': 'Looking around can bring you back to right now.',
  'Hold something warm': 'Warmth can be a simple way back to calm.',
  'Count five slow breaths': 'Counting can give your thoughts a gentler rhythm.',
  'Read a short calming line': 'A few steady words can change the tone of a moment.',
  'Name three sounds around you': 'Listening can anchor you in the present.',
  'Relax your jaw and hands': 'When your body softens, your mind often follows.',
  'Press your feet into the floor': 'Grounding starts where you are.',
  'Do box breathing for one minute': 'Structure can help when things feel uncertain.',
  'Walk slowly for thirty seconds': 'Slow movement can quiet a racing mind.',
  'Look around and name colors': 'Simple noticing can calm the noise inside.',
  'Stay still for a calm minute': 'Peace grows in small steady moments.',
  'Notice one thing going well': 'One good thing is enough to notice today.',
  'Keep breathing slowly': 'Steady breathing helps steady you.',
  'Write one kind note to yourself': 'Kindness is strongest when you include yourself.',
  'Take a short stretch break': 'A short reset can keep calm going.',
  'Choose your next small step': 'Clarity often begins with just one next step.',
  'Take a short energizing walk': 'A little energy can carry you further than you think.',
  'Play one calming song': 'Let one calm thing shape the next few minutes.',
  'Tidy one small spot nearby': 'Order in one small place can create ease around you.',
};

const weatherCodeLabels = {
  0: 'Clear sky',
  1: 'Mostly clear',
  2: 'Partly cloudy',
  3: 'Cloudy',
  45: 'Foggy',
  48: 'Foggy',
  51: 'Light drizzle',
  53: 'Drizzle',
  55: 'Heavy drizzle',
  61: 'Light rain',
  63: 'Rain',
  65: 'Heavy rain',
  71: 'Light snow',
  73: 'Snow',
  75: 'Heavy snow',
  80: 'Rain showers',
  81: 'Strong rain showers',
  82: 'Heavy rain showers',
  95: 'Thunderstorm',
};

const defaultView = {
  label: 'No mood yet',
  tone: 'Welcome. Choose the mood that is true for this moment.',
  themeClass: 'theme-neutral',
  pokemonName: 'Waiting guide',
  pokemonPower: 'unopened path',
  auraClass: 'pokemon-neutral',
  welcome: 'When the feeling is named, the path will reveal its next question.',
};

const energyOptions = [
  {
    id: 'low',
    label: 'Low energy',
    emoji: '😴',
    helper: 'Need softness',
    value: 2,
  },
  {
    id: 'medium',
    label: 'Medium energy',
    emoji: '🙂',
    helper: 'Can do a little',
    value: 5,
  },
  {
    id: 'high',
    label: 'High energy',
    emoji: '⚡',
    helper: 'Ready to move',
    value: 9,
  },
];

function getEnergyBand(energy) {
  if (energy <= 3) return 'low';
  if (energy <= 7) return 'medium';
  return 'high';
}

function App() {
  const [selectedMoodIndex, setSelectedMoodIndex] = useState(0);
  const [confirmedMoodId, setConfirmedMoodId] = useState('');
  const [energy, setEnergy] = useState(5);
  const [selectedActivity, setSelectedActivity] = useState('');
  const [colorMode, setColorMode] = useState('light');
  const [weatherState, setWeatherState] = useState({
    status: 'loading',
    data: null,
    error: '',
  });

  const currentMood = moods[selectedMoodIndex] ?? moods[0] ?? defaultView;
  const selectedMood = moods.find((mood) => mood.id === confirmedMoodId) ?? defaultView;
  const hasPickedMood = confirmedMoodId !== '';
  const energyBand = getEnergyBand(energy);
  const hasPickedActivity = selectedActivity !== '';

  const activities = useMemo(() => {
    if (!hasPickedMood) {
      return [];
    }

    return activityMap[confirmedMoodId]?.[energyBand] ?? [];
  }, [confirmedMoodId, energyBand, hasPickedMood]);

  const energyLabel = useMemo(() => {
    if (energyBand === 'low') return 'Low energy';
    if (energyBand === 'medium') return 'Medium energy';
    return 'High energy';
  }, [energyBand]);

  const selectedEnergyOption = useMemo(() => {
    return energyOptions.find((option) => option.id === energyBand) ?? energyOptions[1];
  }, [energyBand]);

  const selectedQuote = useMemo(() => {
    if (!selectedActivity) return '';

    return activityQuotes[selectedActivity] || 'One kind step is enough for right now.';
  }, [selectedActivity]);

  const weatherSummary = useMemo(() => {
    if (!weatherState.data) return '';

    return weatherCodeLabels[weatherState.data.weatherCode] || 'Current weather';
  }, [weatherState.data]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadWeather() {
      try {
        setWeatherState({ status: 'loading', data: null, error: '' });

        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=3.1390&longitude=101.6869&current=temperature_2m,weather_code',
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error('Weather data could not load right now.');
        }

        const json = await response.json();
        const current = json.current;

        if (!current || typeof current.temperature_2m !== 'number') {
          throw new Error('Weather data is missing expected fields.');
        }

        setWeatherState({
          status: 'ready',
          data: {
            temperature: current.temperature_2m,
            weatherCode: current.weather_code,
            time: current.time,
          },
          error: '',
        });
      } catch (error) {
        if (error.name === 'AbortError') {
          return;
        }

        setWeatherState({
          status: 'error',
          data: null,
          error: error.message || 'Weather data could not load right now.',
        });
      }
    }

    loadWeather();

    return () => controller.abort();
  }, []);

  const handlePreviousMood = () => {
    setConfirmedMoodId('');
    setSelectedActivity('');
    setSelectedMoodIndex((currentIndex) => (currentIndex - 1 + moods.length) % moods.length);
  };

  const handleNextMood = () => {
    setConfirmedMoodId('');
    setSelectedActivity('');
    setSelectedMoodIndex((currentIndex) => (currentIndex + 1) % moods.length);
  };

  const handleChooseMood = () => {
    setConfirmedMoodId(currentMood.id);
    setSelectedActivity('');
  };

  const handleEnergyChange = (event) => {
    setEnergy(Number(event.target.value));
    setSelectedActivity('');
  };

  const handleEnergyCardPick = (value) => {
    setEnergy(value);
    setSelectedActivity('');
  };

  return (
    <main className={`app-shell ${selectedMood.themeClass} ${colorMode === 'dark' ? 'mode-dark' : 'mode-light'}`}>
      <div className="app-frame">
        <aside className="weather-widget" aria-live="polite">
          <div className="weather-widget-head">
            <div>
              <h2 className="weather-widget-title">Live Weather</h2>
              <span className="weather-widget-badge">Live now</span>
            </div>
            <button
              type="button"
              className="mode-toggle"
              onClick={() => setColorMode((currentMode) => (currentMode === 'light' ? 'dark' : 'light'))}
              aria-label="Toggle light and dark mode"
            >
              {colorMode === 'light' ? 'Dark' : 'Light'} mode
            </button>
          </div>

          {weatherState.status === 'loading' && <p className="weather-widget-message">Loading...</p>}

          {weatherState.status === 'error' && (
            <p className="weather-widget-message weather-error">Unavailable right now</p>
          )}

          {weatherState.status === 'ready' && weatherState.data && (
            <div className="weather-widget-grid">
              <div>
                <span>Location</span>
                <strong>Kuala Lumpur</strong>
              </div>
              <div>
                <span>Condition</span>
                <strong>{weatherSummary}</strong>
              </div>
              <div>
                <span>Temperature</span>
                <strong>{weatherState.data.temperature} C</strong>
              </div>
            </div>
          )}
        </aside>

        <section className="card mood-stage" aria-labelledby="mood-picker-heading">
          <div className="mood-stage-copy">
            <h1 id="mood-picker-heading">
              Welcome, traveler. Name the weather within, then choose the guide that matches its
              power.
            </h1>
            <p className="hero-copy">The path opens one calm step at a time.</p>
            <p className="mood-tone">{currentMood.tone}</p>
            <p className="mood-welcome">{currentMood.welcome}</p>
          </div>

          <div className="mood-stage-panel">
            <div className={`companion-sprite-wrap ${currentMood.auraClass}`}>
              <img
                className="companion-sprite"
                src={currentMood.sprite}
                alt={`${currentMood.pokemonName} animated pixel companion`}
              />
            </div>

            <div className="pikachu-nav" aria-label="Choose a mood guide">
              <button
                type="button"
                className="pixel-arrow pixel-arrow-left"
                onClick={handlePreviousMood}
                aria-label="Previous mood"
              >
                <span aria-hidden="true" />
              </button>
              <button type="button" className="pixel-choice-button" onClick={handleChooseMood}>
                {confirmedMoodId === currentMood.id ? 'Chosen mood' : `Choose ${currentMood.label}`}
              </button>
              <button
                type="button"
                className="pixel-arrow pixel-arrow-right"
                onClick={handleNextMood}
                aria-label="Next mood"
              >
                <span aria-hidden="true" />
              </button>
            </div>

            <div className="companion-copy">
              <strong>{currentMood.pokemonName}</strong>
              <span>{currentMood.pokemonPower}</span>
              <p>{confirmedMoodId === currentMood.id ? 'This guide has been chosen for your path.' : 'Use the arrow buttons to explore, then choose the guide that fits your feeling.'}</p>
            </div>

            {hasPickedMood && (
              <div className="slider-wrap section-reveal" aria-label="Choose your energy level">
                <span>Energy level</span>
                <div className="energy-card-grid">
                  {energyOptions.map((option) => {
                    const isSelected = option.id === selectedEnergyOption.id;

                    return (
                      <button
                        key={option.id}
                        type="button"
                        className={`energy-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleEnergyCardPick(option.value)}
                      >
                        <span className="energy-emoji" aria-hidden="true">
                          {option.emoji}
                        </span>
                        <strong>{option.label}</strong>
                        <span>{option.helper}</span>
                      </button>
                    );
                  })}
                </div>
                <small>Choose the card that best matches your energy right now.</small>
              </div>
            )}
          </div>
        </section>

        {hasPickedMood && (
          <section className="card section-grid section-reveal" aria-labelledby="activity-suggestion-heading">
            <div className="section-copy">
              <h2 id="activity-suggestion-heading">Activity Suggestion</h2>
              <p>These three ideas update live based on your chosen mood and energy.</p>
            </div>

            <div className="activity-list">
              {activities.map((activity) => {
                const isSelected = activity === selectedActivity;
                const quote = activityQuotes[activity] || 'One kind step is enough for right now.';

                return (
                  <button
                    key={activity}
                    type="button"
                    className={`activity-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => setSelectedActivity(activity)}
                  >
                    <span className="activity-tag">Calm idea</span>
                    <strong>{activity}</strong>
                    <span>{quote}</span>
                    {isSelected && <span>Chosen for reflection</span>}
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {hasPickedActivity && (
          <section className="card section-grid section-grid-compact section-reveal" aria-labelledby="quick-reflection-heading">
            <div className="section-copy">
              <h2 id="quick-reflection-heading">Quick Reflection</h2>
              <p>Everything you chose is gathered here in one compact view.</p>
            </div>

            <div className="reflection-panel">
              <div className="reflection-hero">
                <div className={`reflection-pokemon ${selectedMood.auraClass}`}>
                  <img
                    className="reflection-pokemon-sprite"
                    src={selectedMood.sprite}
                    alt={`${selectedMood.pokemonName} summary sprite`}
                  />
                </div>
                <div className="reflection-hero-copy">
                  <strong>{selectedMood.pokemonName}</strong>
                  <span>{selectedMood.pokemonPower}</span>
                  <p>{selectedMood.welcome}</p>
                </div>
              </div>

              <div className="reflection-summary-grid">
                <div className="summary-card">
                  <span>Mood</span>
                  <strong>{selectedMood.label}</strong>
                </div>
                <div className="summary-card">
                  <span>Energy</span>
                  <strong>{energyLabel}</strong>
                </div>
                <div className="summary-card summary-card-wide">
                  <span>Activity</span>
                  <strong>{selectedActivity}</strong>
                </div>
                <div className="summary-card summary-card-wide">
                  <span>Helpful quote</span>
                  <strong>{selectedQuote}</strong>
                </div>
              </div>

              <p className="reflection-note">
                {`Right now, you feel ${selectedMood.label.toLowerCase()} with ${energyLabel.toLowerCase()}, and you chose: ${selectedActivity}.`}
              </p>

              <blockquote className="quote-card">"{selectedQuote}"</blockquote>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

export default App;
