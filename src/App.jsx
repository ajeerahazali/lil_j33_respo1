import React, { useEffect, useMemo, useState } from 'react';

const moods = [
  {
    id: 'sad',
    label: 'Sad',
    tone: 'Keep things gentle and simple.',
    themeClass: 'theme-sad',
  },
  {
    id: 'overwhelmed',
    label: 'Overwhelmed',
    tone: 'Take one small step.',
    themeClass: 'theme-overwhelmed',
  },
  {
    id: 'uneasy',
    label: 'Uneasy',
    tone: 'Ground yourself in the present moment.',
    themeClass: 'theme-uneasy',
  },
  {
    id: 'steady',
    label: 'Steady',
    tone: 'Keep that calm feeling going.',
    themeClass: 'theme-steady',
  },
];

const activityMap = {
  sad: {
    low: ['Wrap up in something soft', 'Take three slower breaths', 'Sit by a window for one minute'],
    medium: ['Write one kind sentence to yourself', 'Play one gentle song', 'Stretch your arms and hands'],
    high: ['Take a short outside walk', 'Message yourself one hopeful note', 'Tidy one small area nearby'],
  },
  overwhelmed: {
    low: ['Sit quietly for two minutes', 'Loosen your shoulders', 'Sip a glass of water'],
    medium: ['Take five slow breaths', 'Write one worry on paper', 'Stretch your neck and hands'],
    high: ['Walk around the room', 'Do a one-minute shake-out', 'Name five things you can see'],
  },
  uneasy: {
    low: ['Hold something warm', 'Count five slow breaths', 'Read a short calming line'],
    medium: ['Name three sounds around you', 'Relax your jaw and hands', 'Press your feet into the floor'],
    high: ['Do box breathing for one minute', 'Walk slowly for thirty seconds', 'Look around and name colors'],
  },
  steady: {
    low: ['Stay still for a calm minute', 'Notice one thing going well', 'Keep breathing slowly'],
    medium: ['Write one kind note to yourself', 'Take a short stretch break', 'Choose your next small step'],
    high: ['Take a short energizing walk', 'Play one calming song', 'Tidy one small spot nearby'],
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
  'Write one worry on paper': 'Naming a worry can make it feel less tangled.',
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

const pikachuSprite =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/25.gif';

const pikachuChoicesByMood = {
  sad: [
    {
      id: 'rain-listener',
      name: 'Rain Listener Pikachu',
      power: 'soft cloud power',
      auraClass: 'pikachu-rain-listener',
      line: 'A quiet Pikachu that absorbs heavy feelings and turns them into gentler breaths.',
    },
    {
      id: 'lamp-keeper',
      name: 'Lamp Keeper Pikachu',
      power: 'small light power',
      auraClass: 'pikachu-lamp-keeper',
      line: 'A warm Pikachu that keeps one calm light on, even when the room inside feels dim.',
    },
  ],
  overwhelmed: [
    {
      id: 'anchor-tail',
      name: 'Anchor Tail Pikachu',
      power: 'steady ground power',
      auraClass: 'pikachu-anchor-tail',
      line: 'This Pikachu gathers scattered sparks and grounds them into one clear next step.',
    },
    {
      id: 'shield-spark',
      name: 'Shield Spark Pikachu',
      power: 'protective spark power',
      auraClass: 'pikachu-shield-spark',
      line: 'A strong Pikachu that lowers the noise around you so your breath can lead again.',
    },
  ],
  uneasy: [
    {
      id: 'focus-bolt',
      name: 'Focus Bolt Pikachu',
      power: 'clear mind power',
      auraClass: 'pikachu-focus-bolt',
      line: 'A bright Pikachu that turns restless energy into one clean line of attention.',
    },
    {
      id: 'pulse-guide',
      name: 'Pulse Guide Pikachu',
      power: 'rhythm power',
      auraClass: 'pikachu-pulse-guide',
      line: 'This Pikachu keeps a steady inner rhythm when your thoughts try to race ahead.',
    },
  ],
  steady: [
    {
      id: 'sunrise-spark',
      name: 'Sunrise Spark Pikachu',
      power: 'warm firelight power',
      auraClass: 'pikachu-sunrise-spark',
      line: 'A golden Pikachu that carries calm confidence into the next good step.',
    },
    {
      id: 'trailblaze-tail',
      name: 'Trailblaze Tail Pikachu',
      power: 'forward-motion power',
      auraClass: 'pikachu-trailblaze-tail',
      line: 'This Pikachu holds steady energy and points it gently toward action.',
    },
  ],
};

function getEnergyBand(energy) {
  if (energy <= 3) return 'low';
  if (energy <= 7) return 'medium';
  return 'high';
}

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
  tone: 'Start here by choosing the mood that fits you best right now.',
  themeClass: 'theme-neutral',
};

function App() {
  const [selectedMoodId, setSelectedMoodId] = useState('');
  const [energy, setEnergy] = useState(5);
  const [selectedActivity, setSelectedActivity] = useState('');
  const [selectedPikachuId, setSelectedPikachuId] = useState('');
  const [pikachuIndex, setPikachuIndex] = useState(0);
  const [weatherState, setWeatherState] = useState({
    status: 'loading',
    data: null,
    error: '',
  });

  const selectedMood = moods.find((mood) => mood.id === selectedMoodId) ?? defaultView;
  const energyBand = getEnergyBand(energy);
  const hasPickedMood = selectedMoodId !== '';
  const hasPickedPikachu = selectedPikachuId !== '';
  const hasPickedActivity = selectedActivity !== '';
  const pikachuChoices = hasPickedMood ? pikachuChoicesByMood[selectedMoodId] ?? [] : [];
  const currentPikachu = pikachuChoices[pikachuIndex] ?? null;
  const selectedPikachu = pikachuChoices.find((choice) => choice.id === selectedPikachuId) ?? null;

  const activities = useMemo(() => {
    if (!hasPickedMood || !hasPickedPikachu) {
      return [];
    }

    return activityMap[selectedMoodId]?.[energyBand] ?? [];
  }, [selectedMoodId, energyBand, hasPickedMood, hasPickedPikachu]);

  const energyLabel = useMemo(() => {
    if (energyBand === 'low') return 'Low energy';
    if (energyBand === 'medium') return 'Medium energy';
    return 'High energy';
  }, [energyBand]);

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

  const weatherSummary = useMemo(() => {
    if (!weatherState.data) return '';

    return weatherCodeLabels[weatherState.data.weatherCode] || 'Current weather';
  }, [weatherState.data]);

  const selectedQuote = useMemo(() => {
    if (!selectedActivity) return '';

    return activityQuotes[selectedActivity] || 'One kind step is enough for right now.';
  }, [selectedActivity]);

  const handleMoodChange = (moodId) => {
    setSelectedMoodId(moodId);
    setSelectedPikachuId('');
    setPikachuIndex(0);
    setSelectedActivity('');
  };

  const handleEnergyChange = (event) => {
    setEnergy(Number(event.target.value));
    setSelectedActivity('');
  };

  const handlePreviousPikachu = () => {
    if (!pikachuChoices.length) {
      return;
    }

    setSelectedPikachuId('');
    setSelectedActivity('');
    setPikachuIndex((currentIndex) => (currentIndex - 1 + pikachuChoices.length) % pikachuChoices.length);
  };

  const handleNextPikachu = () => {
    if (!pikachuChoices.length) {
      return;
    }

    setSelectedPikachuId('');
    setSelectedActivity('');
    setPikachuIndex((currentIndex) => (currentIndex + 1) % pikachuChoices.length);
  };

  const handleChoosePikachu = () => {
    if (!currentPikachu) {
      return;
    }

    setSelectedPikachuId(currentPikachu.id);
    setSelectedActivity('');
  };

  return (
    <main className={`app-shell ${selectedMood.themeClass}`}>
      <div className="app-frame">
        <header className="hero card">
          <div className="hero-layout">
            <div className="hero-copy-block">
              <p className="eyebrow">Mood Reset</p>
              <h1>Welcome, traveler. Place your thoughts down gently, and enter one calm step at a time.</h1>
              <p className="hero-copy">
                First choose your mood. Then choose the Pikachu guide that best carries that feeling.
                Only then will the next question rise.
              </p>
            </div>

            <aside className="companion-card" aria-live="polite">
              <p className="activity-tag">8-bit Pikachu guide</p>

              {currentPikachu ? (
                <>
                  <div className={`companion-sprite-wrap ${currentPikachu.auraClass}`}>
                    <img
                      className="companion-sprite"
                      src={pikachuSprite}
                      alt={`${currentPikachu.name} animated pixel companion`}
                    />
                  </div>
                  <div className="pikachu-nav" aria-label="Choose a Pikachu guide">
                    <button
                      type="button"
                      className="pixel-arrow pixel-arrow-left"
                      onClick={handlePreviousPikachu}
                      aria-label="Previous Pikachu"
                    >
                      <span aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      className="pixel-choice-button"
                      onClick={handleChoosePikachu}
                    >
                      {selectedPikachuId === currentPikachu.id ? 'Chosen guide' : 'Choose this Pikachu'}
                    </button>
                    <button
                      type="button"
                      className="pixel-arrow pixel-arrow-right"
                      onClick={handleNextPikachu}
                      aria-label="Next Pikachu"
                    >
                      <span aria-hidden="true" />
                    </button>
                  </div>
                  <div className="companion-copy">
                    <strong>{currentPikachu.name}</strong>
                    <span>{currentPikachu.power}</span>
                    <p>{currentPikachu.line}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="companion-sprite-wrap companion-sprite-empty" aria-hidden="true">
                    <div className="pixel-orb" />
                  </div>
                  <div className="companion-copy">
                    <strong>Choose your mood first</strong>
                    <span>The guide will follow</span>
                    <p>Once your mood is chosen below, a Pikachu guide will appear here for you to select.</p>
                  </div>
                </>
              )}
            </aside>
          </div>
        </header>

        <section className="card section-grid" aria-labelledby="mood-picker-heading">
          <div className="section-copy">
            <p className="section-label">Section 1</p>
            <h2 id="mood-picker-heading">Mood Picker</h2>
            <p>{selectedMood.tone}</p>
          </div>

          <div className="controls-panel">
            <div className="mood-list" role="radiogroup" aria-label="Choose your mood">
              {moods.map((mood) => {
                const isSelected = mood.id === selectedMoodId;

                return (
                  <button
                    key={mood.id}
                    type="button"
                    className={`mood-button ${isSelected ? 'selected' : ''}`}
                    aria-pressed={isSelected}
                    onClick={() => handleMoodChange(mood.id)}
                  >
                    <span className="mood-button-label">{mood.label}</span>
                    <span className="mood-button-copy">
                      {isSelected ? 'Page theme is active now' : 'Switch the page to this mood'}
                    </span>
                  </button>
                );
              })}
            </div>

            {hasPickedPikachu && selectedPikachu && (
              <label className="slider-wrap" htmlFor="energy-slider">
                <span>Energy level for {selectedPikachu.name}: {energyLabel}</span>
                <input
                  id="energy-slider"
                  type="range"
                  min="1"
                  max="10"
                  value={energy}
                  onChange={handleEnergyChange}
                />
                <small>Now that you chose your Pikachu guide, match the slider to your energy right now.</small>
              </label>
            )}
          </div>
        </section>

        {hasPickedPikachu && (
          <section className="card section-grid section-reveal" aria-labelledby="activity-suggestion-heading">
            <div className="section-copy">
              <p className="section-label">Section 2</p>
              <h2 id="activity-suggestion-heading">Activity Suggestion</h2>
              <p>These three ideas update live based on your mood and energy.</p>
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
                    <span>{isSelected ? 'Chosen for reflection' : 'Tap to choose this activity'}</span>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {hasPickedActivity && (
          <section className="card section-grid section-reveal" aria-labelledby="quick-reflection-heading">
            <div className="section-copy">
              <p className="section-label">Section 3</p>
              <h2 id="quick-reflection-heading">Quick Reflection</h2>
              <p>See your current choices clearly. This app only shows what you picked right now.</p>
            </div>

            <div className="reflection-panel">
              <div className="reflection-row">
                <span>Chosen mood</span>
                <strong>{selectedMood.label}</strong>
              </div>
              <div className="reflection-row">
                <span>Energy level</span>
                <strong>{energyLabel}</strong>
              </div>
              <div className="reflection-row">
                <span>Selected activity</span>
                <strong>{selectedActivity}</strong>
              </div>
              {selectedPikachu && (
                <div className="reflection-row">
                  <span>Chosen Pikachu</span>
                  <strong>{selectedPikachu.name}</strong>
                </div>
              )}
              <div className="reflection-row">
                <span>Helpful quote</span>
                <strong>{selectedQuote}</strong>
              </div>
              <p className="reflection-note">
                {`Right now, you feel ${selectedMood.label.toLowerCase()} with ${energyLabel.toLowerCase()}, and you chose: ${selectedActivity}.`}
              </p>

              <blockquote className="quote-card">"{selectedQuote}"</blockquote>

              <div className="weather-card" aria-live="polite">
                <p className="activity-tag">Live weather in Kuala Lumpur</p>

                {weatherState.status === 'loading' && (
                  <p className="weather-message">Loading current weather for your reflection section.</p>
                )}

                {weatherState.status === 'error' && (
                  <p className="weather-message weather-error">{weatherState.error}</p>
                )}

                {weatherState.status === 'ready' && weatherState.data && (
                  <div className="weather-details">
                    <div className="weather-row">
                      <span>Temperature</span>
                      <strong>{weatherState.data.temperature} C</strong>
                    </div>
                    <div className="weather-row">
                      <span>Condition</span>
                      <strong>{weatherSummary}</strong>
                    </div>
                    <div className="weather-row">
                      <span>Updated</span>
                      <strong>{weatherState.data.time}</strong>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

export default App;
