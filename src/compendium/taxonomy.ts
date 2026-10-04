/**
 * The compendium's table of contents: the single source of truth for the sidebar, landing pages,
 * breadcrumbs and prev/next. Three levels:  Section  >  Subsection  >  Article.
 *
 * An article's body lives at  src/compendium/content/<section>/<sub>/<article>.mdx
 * Slugs are kebab-case and every article slug is unique across the whole compendium.
 */

export type IconName =
  | 'hobby' | 'radio' | 'electronics' | 'antennas' | 'stations'
  | 'modes' | 'activities' | 'emergency' | 'safety' | 'reference'

export interface ArticleDef {
  slug: string
  title: string
  /** One line (<= ~100 chars): shown in listings and search results. */
  summary: string
}
export interface SubDef {
  slug: string
  title: string
  blurb: string
  articles: ArticleDef[]
}
export interface SectionDef {
  slug: string
  title: string
  blurb: string
  icon: IconName
  subs: SubDef[]
}

/** [slug, title, summary] */
type A = [string, string, string]
const sub = (slug: string, title: string, blurb: string, articles: A[]): SubDef => ({
  slug, title, blurb, articles: articles.map(([s, t, d]) => ({ slug: s, title: t, summary: d })),
})

export const SECTIONS: SectionDef[] = [
  {
    slug: 'hobby', title: 'The hobby', icon: 'hobby',
    blurb: 'What amateur radio is, how licensing works, and the language of the air.',
    subs: [
      sub('service', 'The amateur radio service', 'What it is, where it came from, and how to join in.', [
        ['what-is-amateur-radio', 'What is amateur radio?', 'A licensed radio service for self-training, experimentation and public service, never for money.'],
        ['history', 'A short history of amateur radio', 'From spark gaps and the first licenses to repeaters, satellites and software.'],
        ['ways-to-get-on-the-air', 'Ways to get on the air', 'A map of what operators actually do, from rag chewing to moonbounce.'],
        ['clubs-and-elmers', 'Clubs, Elmers and community', 'How to find mentors, clubs, nets, hamfests and learning groups.'],
      ]),
      sub('licensing', 'Licenses, call signs and rules', 'Who may transmit, on what, and under which rules.', [
        ['license-classes', 'License classes and privileges', 'Technician, General and Extra: what each adds and how upgrading works.'],
        ['call-signs', 'Call signs and what they mean', 'Prefixes, numbers, suffixes and how a call is assigned.'],
        ['vanity-and-special-event-calls', 'Vanity and special-event calls', 'Choosing your own call, and temporary event call signs.'],
        ['part-97-in-plain-words', 'Part 97 in plain words', 'The FCC rules every amateur operates under, organised by what you want to do.'],
        ['control-operators', 'Control operators and control points', 'Who is responsible for a station, and how remote and automatic control fit in.'],
        ['operating-abroad', 'Operating abroad', 'ITU regions, reciprocal licensing and CEPT.'],
      ]),
      sub('language', 'Speaking the language of the air', 'The shared vocabulary that makes weak signals understandable.', [
        ['phonetic-alphabet', 'The phonetic alphabet', 'Why we say "Whiskey" for W, and how to spell a call so it gets through.'],
        ['q-codes', 'Q-codes', 'Three-letter shorthand like QTH, QSL and QRM, and what each means.'],
        ['ham-abbreviations', 'Ham abbreviations and numbers', '73, 88, CQ, DX, QSO and other jargon, decoded.'],
        ['signal-reports', 'Signal reports: RS, RST and the S-meter', 'How to tell someone how well you hear them, in numbers.'],
        ['operating-etiquette', 'On-air etiquette', 'Listening first, calling CQ, taking turns, and being a good neighbour on the band.'],
        ['logging-and-qsl', 'Logging and QSL confirmations', 'Keeping a log, paper cards, Logbook of the World and eQSL.'],
      ]),
    ],
  },
  {
    slug: 'radio', title: 'Radio fundamentals', icon: 'radio',
    blurb: 'Waves, the spectrum, how signals travel, and how information rides on them.',
    subs: [
      sub('waves', 'Waves and the spectrum', 'The physics every radio is built on.', [
        ['electromagnetic-waves', 'Electromagnetic waves', 'Electric and magnetic fields travelling together at the speed of light.'],
        ['frequency-and-wavelength', 'Frequency and wavelength', 'Two ways to describe the same wave, tied together by the speed of light.'],
        ['radio-spectrum', 'The radio spectrum', 'LF to microwaves: where the bands sit and what each is good for.'],
        ['polarization', 'Polarization', "The orientation of a wave's electric field, and why antennas must match it."],
        ['decibels', 'Decibels', 'The logarithmic scale for gain, loss and signal strength.'],
        ['noise-and-snr', 'Noise and signal-to-noise ratio', 'Where noise comes from and why SNR decides what you can copy.'],
      ]),
      sub('propagation', 'How signals travel', 'Why a signal reaches across town, the world, or nowhere at all.', [
        ['ground-wave', 'Ground wave and surface wave', 'Low-frequency signals that follow the curve of the Earth.'],
        ['line-of-sight', 'Line of sight and the radio horizon', 'Why VHF and UHF reach about as far as you can see, and a little further.'],
        ['ionosphere-layers', 'The ionosphere', 'The D, E and F layers: what they are and what they do to radio waves.'],
        ['skywave-and-skip', 'Skywave, hops and the skip zone', 'How HF signals return to Earth hundreds or thousands of miles away.'],
        ['muf-and-luf', 'MUF, LUF and the best frequency', 'The highest and lowest usable frequencies for a path.'],
        ['solar-cycle-and-indices', 'The solar cycle and propagation indices', 'Sunspots, solar flux, and the A and K indices.'],
        ['grey-line-and-long-path', 'Grey line and long path', 'Dawn-and-dusk enhancement, and signals that go the long way around.'],
        ['sporadic-e', 'Sporadic E', 'Short-lived patches of ionization that open VHF over long distances.'],
        ['tropospheric-propagation', 'Tropospheric ducting and scatter', 'Weather that bends VHF and UHF well past the horizon.'],
        ['meteor-scatter', 'Meteor scatter', 'Bouncing signals off ionized meteor trails.'],
        ['aurora-propagation', 'Aurora propagation', 'Reflecting VHF signals from the northern lights.'],
        ['nvis', 'Near-vertical incidence skywave', 'Steep-angle HF for reliable regional contacts.'],
        ['space-weather', 'Space weather', 'Flares, CMEs and storms, and how they help or wreck HF.'],
      ]),
      sub('modulation', 'Signals and modulation', 'How information is put onto a radio wave and taken off again.', [
        ['modulation-basics', 'What modulation is', 'Putting information onto a carrier wave.'],
        ['amplitude-modulation', 'Amplitude modulation (AM)', 'Varying carrier strength: sidebands, bandwidth and efficiency.'],
        ['frequency-modulation', 'Frequency modulation (FM)', 'Varying carrier frequency: deviation, capture effect and noise immunity.'],
        ['single-sideband', 'Single sideband (SSB)', 'Dropping the carrier and one sideband for efficient HF voice.'],
        ['digital-modulation', 'Digital modulation: FSK, PSK and QAM', 'How bits become tones and phase shifts.'],
        ['bandwidth-and-data-rate', 'Bandwidth, symbol rate and data rate', 'How much spectrum a signal needs and how much it can carry.'],
        ['error-correction', 'Error detection and correction', 'Parity, CRC and forward error correction.'],
        ['spread-spectrum', 'Spread spectrum', 'Direct sequence, frequency hopping and why they resist interference.'],
        ['spectrum-and-fourier', 'Time domain, frequency domain and Fourier', 'Seeing a signal as its sine-wave ingredients.'],
        ['sampling-and-nyquist', 'Sampling and the Nyquist limit', 'Turning a continuous signal into numbers, and aliasing.'],
      ]),
    ],
  },
  {
    slug: 'electronics', title: 'Electricity and electronics', icon: 'electronics',
    blurb: 'The electrical engineering behind every radio: circuits, components, measurement and building.',
    subs: [
      sub('basics', 'Electrical basics', 'The quantities and laws every circuit obeys.', [
        ['voltage-current-resistance', 'Voltage, current and resistance', 'The three quantities every circuit is about.'],
        ['ohms-law', "Ohm's law", 'The relationship that links them, and how to use it.'],
        ['power-and-energy', 'Power and energy', 'Watts, joules and kilowatt-hours; P = E × I.'],
        ['ac-dc-and-waveforms', 'AC, DC and waveforms', 'Sine, square and triangle; peak, peak-to-peak and RMS.'],
        ['series-and-parallel', 'Series and parallel circuits', 'How resistors combine and where current and voltage divide.'],
        ['kirchhoff-laws', "Kirchhoff's laws", 'Current in equals current out; voltages around a loop sum to zero.'],
        ['units-and-prefixes', 'Units and metric prefixes', 'From pico to giga, and converting without mistakes.'],
        ['conductors-and-insulators', 'Conductors and insulators', 'Why materials differ in how they carry current.'],
      ]),
      sub('ac-theory', 'Reactance and AC theory', 'What capacitors and inductors do once the signal alternates.', [
        ['capacitance', 'Capacitance', 'Storing energy in an electric field.'],
        ['inductance', 'Inductance', 'Storing energy in a magnetic field.'],
        ['reactance-and-impedance', 'Reactance and impedance', 'How capacitors and inductors resist AC, and combine with resistance.'],
        ['phasors-and-complex-numbers', 'Phasors and complex numbers', 'The maths that makes AC circuits tractable.'],
        ['time-constants', 'Time constants', 'How quickly RC and RL circuits charge and decay.'],
        ['resonance-and-q', 'Resonance and Q', 'Tuned circuits, bandwidth and selectivity.'],
        ['transformers', 'Transformers', 'Turns ratio, voltage, current and impedance transformation.'],
        ['skin-effect', 'Skin effect and RF resistance', 'Why current crowds to the surface at high frequency.'],
      ]),
      sub('components', 'Components', 'The parts, what they do, and how to choose them.', [
        ['resistors', 'Resistors', 'Types, ratings, tolerance and the colour code.'],
        ['capacitors', 'Capacitors', 'Ceramic, electrolytic, film and variable: choosing the right one.'],
        ['inductors-and-ferrites', 'Inductors, toroids and ferrites', 'Cores, permeability, and why ferrite beads matter.'],
        ['crystals-and-resonators', 'Crystals and resonators', 'Piezoelectric frequency references and filters.'],
        ['switches-relays-fuses', 'Switches, relays and fuses', 'Controlling and protecting circuits.'],
        ['batteries', 'Batteries', 'Chemistries, capacity, internal resistance and charging.'],
        ['wire-and-cable', 'Wire, cable and gauge', 'AWG, current ratings, and where each wire type belongs.'],
      ]),
      sub('semiconductors', 'Semiconductors', 'Diodes, transistors and the devices built from them.', [
        ['semiconductor-basics', 'Semiconductor basics', 'Doping, P-N junctions and how they conduct.'],
        ['diodes', 'Diodes', 'Rectifier, zener, Schottky, varactor, PIN and LED.'],
        ['bipolar-transistors', 'Bipolar transistors', 'A small base current controlling a big collector current.'],
        ['fets-and-mosfets', 'FETs and MOSFETs', 'Voltage-controlled devices for switching and RF.'],
        ['integrated-circuits', 'Integrated circuits', 'Analog, digital and RF chips.'],
        ['op-amps', 'Operational amplifiers', 'The building block of gain, filters and comparators.'],
        ['optoelectronics', 'Optoelectronics', 'LEDs, photodiodes, solar cells and optoisolators.'],
        ['vacuum-tubes', 'Vacuum tubes', 'Triodes to beam tetrodes, and why they still power amplifiers.'],
      ]),
      sub('circuits', 'Analog circuits', 'The functional blocks radios are assembled from.', [
        ['amplifiers', 'Amplifiers and classes of operation', 'Gain, linearity and efficiency: classes A to C.'],
        ['oscillators', 'Oscillators', 'Amplifier plus feedback: LC, crystal and VFO.'],
        ['filters', 'Filters', 'Low-pass, high-pass, band-pass and notch; passive and active.'],
        ['mixers', 'Mixers and frequency conversion', 'Making sum and difference frequencies.'],
        ['detectors-and-demodulators', 'Detectors and demodulators', 'Recovering the audio from AM, FM and SSB.'],
        ['pll-and-synthesizers', 'PLLs and frequency synthesizers', 'Locking a variable oscillator to a stable reference.'],
        ['power-supplies', 'Power supplies and regulators', 'Transformer, rectifier, filter, regulator; linear versus switching.'],
        ['matching-networks', 'Impedance matching networks', 'L, Pi and T networks and how they transform impedance.'],
        ['attenuators', 'Attenuators and pads', 'Reducing signal level without upsetting the impedance.'],
      ]),
      sub('digital', 'Digital electronics and DSP', 'Logic, conversion and signal processing.', [
        ['logic-gates', 'Logic gates', 'AND, OR, NOT, NAND, NOR and XOR.'],
        ['flip-flops-and-counters', 'Flip-flops, counters and shift registers', 'Memory and sequencing in digital circuits.'],
        ['adc-and-dac', 'ADCs and DACs', 'Converting between analog voltages and numbers.'],
        ['dsp-basics', 'Digital signal processing', 'Filtering and demodulating with maths instead of components.'],
        ['microcontrollers', 'Microcontrollers', 'Arduino, Pico and friends in the ham shack.'],
      ]),
      sub('test-equipment', 'Measurement and test', 'Seeing what a circuit or antenna is really doing.', [
        ['multimeters', 'Multimeters', 'Measuring volts, amps and ohms safely.'],
        ['oscilloscopes', 'Oscilloscopes', 'Seeing voltage against time.'],
        ['spectrum-analyzers', 'Spectrum analyzers', 'Seeing signal strength against frequency.'],
        ['swr-and-power-meters', 'SWR and power meters', 'Checking forward and reflected power.'],
        ['antenna-analyzers-and-vnas', 'Antenna analyzers and VNAs', 'Measuring impedance, SWR and resonance across a band.'],
        ['dummy-loads', 'Dummy loads', 'Testing a transmitter without radiating.'],
        ['counters-and-signal-generators', 'Frequency counters and signal generators', 'Measuring and creating test signals.'],
      ]),
      sub('workshop', 'Building and workshop skills', 'Turning a schematic into a working circuit.', [
        ['soldering', 'Soldering', 'Technique, tools and what a good joint looks like.'],
        ['reading-schematics', 'Reading schematics', 'Symbols, conventions and following a circuit.'],
        ['construction-methods', 'Construction methods', 'Dead-bug, perfboard, PCBs and enclosures.'],
        ['kits-and-homebrew', 'Kits and homebrew', 'Starting to build your own gear.'],
        ['troubleshooting', 'Troubleshooting', 'A systematic way to find a fault.'],
      ]),
    ],
  },
  {
    slug: 'antennas', title: 'Antennas', icon: 'antennas',
    blurb: 'Every common antenna, how each works, and the feed lines and hardware that connect them.',
    subs: [
      sub('fundamentals', 'Antenna fundamentals', 'The ideas that apply to every antenna.', [
        ['how-antennas-work', 'How antennas work', 'Turning current into radio waves and back again.'],
        ['gain-and-directivity', 'Gain and directivity', 'dBi, dBd and where the energy goes.'],
        ['radiation-patterns', 'Radiation patterns', 'Reading azimuth and elevation plots, beamwidth and front-to-back.'],
        ['impedance-and-radiation-resistance', 'Antenna impedance and radiation resistance', 'What the feed line sees at the feed point.'],
        ['bandwidth-and-efficiency', 'Bandwidth and efficiency', 'How wide an antenna works and how much power is actually radiated.'],
        ['ground-and-height', 'Ground effects and height', 'How earth and height shape the pattern.'],
        ['near-and-far-field', 'Near field and far field', 'Why distance from the antenna changes the physics.'],
        ['antenna-modeling', 'Antenna modeling', 'Using NEC-based software to predict performance.'],
      ]),
      sub('wire', 'Wire antennas', 'Dipoles, loops and long wires: the antennas most operators start with.', [
        ['half-wave-dipole', 'The half-wave dipole', 'The reference antenna: pattern, impedance and length.'],
        ['inverted-v', 'The inverted V', 'A dipole with one support and a lower impedance.'],
        ['multiband-dipoles', 'Fan and trap dipoles', 'Covering several bands with one antenna.'],
        ['off-center-fed-dipole', 'Off-center-fed dipoles', 'Multiband operation with a 4:1 balun.'],
        ['end-fed-half-wave', 'End-fed half-wave antennas', 'A half-wave fed through a high-impedance transformer.'],
        ['long-and-random-wires', 'Long wires and random wires', 'Simple wire with a tuner: benefits and traps.'],
        ['folded-dipole', 'The folded dipole', 'Wider bandwidth and four times the impedance.'],
        ['g5rv-and-doublets', 'Doublets and the G5RV', 'Open-wire-fed multiband antennas.'],
        ['full-wave-loops', 'Full-wave loops', 'A wire loop with gain and low noise.'],
        ['slopers-and-inverted-l', 'Slopers and the inverted L', 'Wire antennas for one support and the low bands.'],
      ]),
      sub('verticals', 'Vertical and mobile antennas', 'Omnidirectional antennas for base, vehicle and low bands.', [
        ['quarter-wave-vertical', 'The quarter-wave vertical', 'A monopole over ground: the workhorse omnidirectional antenna.'],
        ['radials-and-ground-planes', 'Radials and ground planes', 'Why a vertical needs a counterpoise and how many radials.'],
        ['five-eighths-and-colinears', '5/8-wave and colinear antennas', 'Squeezing gain out of a vertical.'],
        ['j-pole-and-slim-jim', 'J-poles and Slim Jims', 'Easy VHF/UHF verticals built from wire or ladder line.'],
        ['mobile-whips-and-loading', 'Mobile whips and loading coils', 'Short antennas that work on a vehicle.'],
        ['hf-multiband-verticals', 'Multiband HF verticals', 'Trap, tuned and autotuned vertical designs.'],
      ]),
      sub('beams', 'Beam and directional antennas', 'Concentrating power in one direction.', [
        ['yagi-uda', 'The Yagi-Uda beam', 'Driven element, reflector and directors.'],
        ['quad-and-delta-loop-beams', 'Quad and delta-loop beams', 'Loop elements for gain and low noise.'],
        ['log-periodic', 'Log-periodic antennas', 'Wide bandwidth with moderate gain.'],
        ['moxon-and-hex-beams', 'Moxon and hex beams', 'Compact wire beams with good front-to-back.'],
        ['phased-arrays', 'Phased arrays', 'Steering a pattern with phase and spacing.'],
        ['dish-antennas', 'Dish and parabolic antennas', 'Microwave gain with a reflector.'],
        ['helical-and-satellite-antennas', 'Helical and satellite antennas', 'Circular polarization for space work.'],
      ]),
      sub('compact', 'Compact, portable and stealth', 'Antennas for small spaces, backpacks and restricted lots.', [
        ['magnetic-loop', 'Small magnetic loops', 'Tiny, high-Q antennas with a narrow bandwidth.'],
        ['loaded-and-short-antennas', 'Loaded and short antennas', 'Trading size against efficiency.'],
        ['portable-field-antennas', 'Portable and field antennas', 'Light, quick designs for SOTA, POTA and camping.'],
        ['stealth-antennas', 'Stealth antennas', 'Working within HOA or apartment restrictions.'],
        ['handheld-antennas', 'Handheld radio antennas', 'Rubber ducks, whips and getting more from an HT.'],
      ]),
      sub('receiving', 'Receiving and direction-finding antennas', 'Antennas chosen for hearing rather than transmitting.', [
        ['beverage-antennas', 'Beverage antennas', 'A long wire close to the ground that listens directionally.'],
        ['receive-loops-and-active-antennas', 'Receive loops and active antennas', 'Small receiving antennas for noisy locations.'],
        ['noise-cancelling', 'Noise cancelling and phasing', 'Nulling local noise.'],
        ['direction-finding-antennas', 'Direction-finding antennas', 'Loops, Adcock arrays and Yagis for finding a transmitter.'],
      ]),
      sub('feedlines', 'Feed lines and matching', 'Getting power to the antenna and keeping it there.', [
        ['coaxial-cable', 'Coaxial cable', 'Construction, types and choosing a coax.'],
        ['open-wire-line', 'Open-wire and ladder line', 'Low-loss balanced feed lines.'],
        ['characteristic-impedance', 'Characteristic impedance', 'What Z0 means and why it must match.'],
        ['feed-line-loss', 'Feed line loss and velocity factor', 'Attenuation by frequency and electrical length.'],
        ['swr-and-reflections', 'SWR and reflections', 'Standing waves, reflection coefficient and return loss.'],
        ['antenna-tuners', 'Antenna tuners', "What they match and what they don't fix."],
        ['baluns-and-ununs', 'Baluns and ununs', 'Balanced-unbalanced and impedance transformers.'],
        ['common-mode-chokes', 'Common-mode chokes', 'Keeping RF off the outside of the coax.'],
        ['stubs-and-matching-sections', 'Stubs, quarter-wave sections and the gamma match', 'Matching with pieces of transmission line.'],
        ['smith-chart', 'The Smith chart', 'A map of impedance and reflection.'],
        ['rf-connectors', 'RF connectors', 'PL-259, N, BNC, SMA and when to use each.'],
      ]),
      sub('installation', 'Installation and protection', 'Getting an antenna up and keeping it safe.', [
        ['towers-and-masts', 'Towers and masts', 'Choosing and installing supports.'],
        ['rotators', 'Rotators and controllers', 'Turning a beam reliably.'],
        ['lightning-and-grounding', 'Lightning protection and grounding', 'Protecting people, equipment and antennas.'],
        ['antenna-restrictions', 'Antenna restrictions and PRB-1', 'Zoning, covenants and your rights.'],
      ]),
    ],
  },
  {
    slug: 'stations', title: 'Transceivers and station equipment', icon: 'stations',
    blurb: 'How radios work inside, the kinds you can buy, and everything around them in the shack.',
    subs: [
      sub('how-radios-work', 'How radios work', 'From antenna to speaker, and microphone to antenna.', [
        ['receiver-basics', 'Receiver basics', 'From antenna to speaker.'],
        ['superheterodyne', 'The superheterodyne receiver', 'Mixing everything to one intermediate frequency.'],
        ['direct-conversion-and-sdr', 'Direct conversion and SDR receivers', 'Skipping the IF with I/Q sampling.'],
        ['transmitter-basics', 'Transmitter basics', 'Oscillator, modulator, driver and final amplifier.'],
        ['transceiver-block-diagram', 'The transceiver, end to end', 'How one box does both jobs.'],
        ['receiver-performance', 'Sensitivity, selectivity and dynamic range', 'The numbers that describe a receiver.'],
        ['agc-and-noise-reduction', 'AGC, noise blankers and noise reduction', 'Taming level changes and noise.'],
        ['radio-filters', 'Filters in radios', 'Roofing, crystal, mechanical and DSP filters.'],
        ['rit-xit-and-split', 'RIT, XIT and split operation', 'Offsetting receive and transmit frequencies.'],
      ]),
      sub('radio-types', 'Types of radios', 'What exists, and what each is best at.', [
        ['hf-transceivers', 'HF transceivers', 'What to look for in a base-station rig.'],
        ['handheld-transceivers', 'Handheld transceivers', 'VHF/UHF HTs and their limits.'],
        ['vhf-uhf-mobile-and-base', 'VHF/UHF mobile and base radios', 'Higher power and better antennas than an HT.'],
        ['qrp-radios', 'QRP and portable radios', 'Small, low-power rigs for the field.'],
        ['sdr-transceivers', 'SDR transceivers', 'Software-defined radios as full stations.'],
        ['receivers-and-scanners', 'Receivers, scanners and SDR dongles', 'Listening-only gear.'],
        ['repeaters-and-controllers', 'Repeaters and controllers', 'The hardware behind a repeater.'],
        ['hotspots-and-gateways', 'Hotspots and gateways', 'Personal digital-voice nodes.'],
        ['vintage-radios', 'Vintage and tube radios', 'Boat anchors and restoration.'],
      ]),
      sub('controls', 'Radio controls and features', 'The knobs, menus and settings that matter.', [
        ['squelch-and-tones', 'Squelch, CTCSS and DCS', 'Keeping the speaker quiet until it matters.'],
        ['memories-and-scanning', 'Memories and scanning', 'Storing and searching frequencies.'],
        ['power-and-swr-protection', 'Power output and SWR protection', 'Setting power and protecting the final amplifier.'],
        ['speech-processing-and-mic-gain', 'Mic gain, compression and ALC', 'Getting a clean SSB signal.'],
        ['cat-control', 'CAT control and rig software', 'Controlling the radio from a computer.'],
      ]),
      sub('accessories', 'Station accessories and power', 'Everything that surrounds the radio.', [
        ['shack-power-supplies', 'Shack power supplies', 'Sizing and choosing a 13.8 V supply.'],
        ['linear-amplifiers', 'Linear amplifiers', 'Adding power: tubes, solid state and the limits.'],
        ['microphones-and-headsets', 'Microphones and headsets', 'Audio gear for phone work.'],
        ['computer-interfaces', 'Computer and sound-card interfaces', 'Connecting a radio to digital-mode software.'],
        ['antenna-switching', 'Antenna switches and station switching', 'Routing antennas and radios.'],
        ['portable-power', 'Batteries, solar and portable power', 'Running a station off-grid.'],
        ['station-layout', 'Station layout and ergonomics', 'Arranging a safe, efficient shack.'],
      ]),
    ],
  },
  {
    slug: 'modes', title: 'Operating modes', icon: 'modes',
    blurb: 'Phone, Morse code, digital and video: how each mode works and how to use it.',
    subs: [
      sub('voice', 'Voice (phone)', 'Talking on the air.', [
        ['fm-voice', 'FM voice operation', 'Repeaters, simplex and the "local" mode.'],
        ['ssb-voice', 'SSB voice operation', 'HF phone: tuning, sidebands and clarity.'],
        ['am-operation', 'AM operation', 'The oldest voice mode, still in use.'],
        ['repeaters', 'Repeaters and how to use them', 'Offsets, tones and etiquette.'],
        ['simplex', 'Simplex operation', 'Direct radio-to-radio contacts.'],
        ['voice-nets', 'Voice nets and net procedure', 'Running and joining a net.'],
      ]),
      sub('cw', 'CW (Morse code)', 'The oldest digital mode, and still one of the most effective.', [
        ['what-is-cw', 'What CW is and why it endures', 'A narrow, efficient mode that gets through.'],
        ['morse-alphabet', 'The Morse alphabet and timing', 'Dits, dahs and spacing.'],
        ['learning-morse', 'Learning Morse code', 'Koch, Farnsworth and daily practice.'],
        ['keys-and-paddles', 'Straight keys, paddles and bugs', 'Hardware for sending.'],
        ['cw-procedures', 'CW procedure and prosigns', 'Calling, QSOs and signing off in Morse.'],
        ['cw-contesting-and-rbn', 'CW contesting and the Reverse Beacon Network', 'Fast exchanges and automated decoding.'],
        ['qrp-cw', 'QRP CW', 'Making contacts on a few watts.'],
        ['cw-decoding', 'Decoding CW by ear and by computer', 'Learning to copy and what software can do.'],
      ]),
      sub('digital', 'Digital data modes', 'Keyboards, computers and sound cards on the air.', [
        ['digital-modes-overview', 'Digital modes overview', 'The landscape of data modes and what each is for.'],
        ['psk31', 'PSK31', 'Keyboard chat in 31 Hz.'],
        ['rtty', 'RTTY', 'The original radioteletype.'],
        ['ft8-and-ft4', 'FT8 and FT4', 'Weak-signal 15-second and 7.5-second modes.'],
        ['js8call', 'JS8Call', 'Keyboard messaging built on FT8.'],
        ['wspr', 'WSPR', 'Propagation beacons with milliwatts.'],
        ['jt-modes', 'JT65, JT9 and the WSJT family', 'Weak-signal modes for EME and HF.'],
        ['mfsk-and-olivia', 'MFSK, Olivia and Contestia', 'Robust modes for poor conditions.'],
        ['packet-radio', 'Packet radio and AX.25', 'Digital messaging with nodes and BBSs.'],
        ['aprs', 'APRS', 'Position and message reporting.'],
        ['winlink', 'Winlink and radio email', 'Email over HF and VHF.'],
        ['vara-and-ardop', 'VARA, ARDOP and PACTOR', 'High-speed ARQ data modes.'],
        ['digital-mode-software', 'Digital mode software', 'WSJT-X, fldigi and friends.'],
      ]),
      sub('digital-voice', 'Digital voice and linked networks', 'Voice carried as data, and repeaters joined over the internet.', [
        ['d-star', 'D-STAR', "Icom's digital voice and data system."],
        ['dmr', 'DMR', 'Time-slot digital voice with talk groups.'],
        ['system-fusion', 'Yaesu System Fusion', 'C4FM digital voice.'],
        ['p25-and-nxdn', 'P25 and NXDN', 'Public-safety-derived digital voice.'],
        ['m17', 'M17', 'An open-source digital voice protocol.'],
        ['internet-linking', 'EchoLink, IRLP and AllStar', 'Linking repeaters over the internet.'],
      ]),
      sub('image', 'Image and video', 'Pictures and moving pictures by radio.', [
        ['slow-scan-tv', 'Slow-scan TV', 'Still pictures over voice bandwidth.'],
        ['fast-scan-tv', 'Fast-scan TV', 'Real-time amateur television.'],
        ['digital-atv', 'Digital amateur television', 'DATV with DVB.'],
      ]),
    ],
  },
  {
    slug: 'activities', title: 'Things to do with amateur radio', icon: 'activities',
    blurb: 'What operators actually do, from contests to satellites to hunting for hidden transmitters.',
    subs: [
      sub('everyday', 'Everyday operating', 'The core of the hobby.', [
        ['ragchewing', 'Ragchewing', 'Conversation as a hobby.'],
        ['nets', 'Nets', 'Scheduled on-air gatherings.'],
        ['dxing', 'DXing', 'Chasing distant stations.'],
        ['dx-etiquette-and-split', 'DX etiquette and split operation', 'Working a pile-up.'],
        ['contesting', 'Contesting', 'Timed competitions: rules, strategy and scoring.'],
        ['awards', 'Awards and certificates', 'DXCC, WAS, WAC and more.'],
        ['logging-software', 'Logging and contest software', 'Keeping track and avoiding dupes.'],
      ]),
      sub('outdoors', 'Portable and outdoors', 'Taking the station outside.', [
        ['parks-on-the-air', 'Parks on the Air', 'Operating from parks and activating them.'],
        ['summits-on-the-air', 'Summits on the Air', 'Radio on mountaintops.'],
        ['field-day', 'Field Day', 'The annual emergency-readiness exercise.'],
        ['special-events', 'Special events, IOTA and lighthouses', 'Temporary stations and award programs.'],
        ['mobile-operation', 'Mobile and maritime mobile', 'Operating on the move.'],
      ]),
      sub('space', 'Space and the sky', 'Operating through and off things in orbit.', [
        ['amateur-satellites', 'Amateur satellites', 'Orbiting repeaters and transponders.'],
        ['satellite-operating', 'Working satellites', 'Tracking, Doppler and a pass.'],
        ['iss-and-ariss', 'ISS and ARISS', 'Talking to astronauts.'],
        ['eme-moonbounce', 'EME (moonbounce)', 'Reflecting signals off the Moon.'],
        ['balloons', 'High-altitude balloons', 'Ham radio payloads in the stratosphere.'],
        ['radio-astronomy', 'Radio astronomy and solar monitoring', 'Listening to the sky.'],
      ]),
      sub('weak-signal', 'Weak-signal and microwaves', 'Pushing detection and distance records.', [
        ['weak-signal-vhf', 'Weak-signal VHF/UHF', 'SSB, CW and digital at the edge of detection.'],
        ['six-meters', 'Six meters: the magic band', 'Sporadic E and openings on 50 MHz.'],
        ['microwaves', 'Microwave operating', '1.2 GHz and up.'],
        ['lf-and-mf', 'LF and MF experimenting', '2200 m and 630 m.'],
      ]),
      sub('direction-finding', 'Direction finding', 'Finding where a signal is coming from.', [
        ['rdf-basics', 'Radio direction finding basics', 'Bearings, triangulation and null techniques.'],
        ['fox-hunting-and-ardf', 'Fox hunting and ARDF', 'Competitive transmitter hunting.'],
      ]),
      sub('experimenting', 'Experimenting and technology', 'Where radio meets computing.', [
        ['aredn-mesh', 'AREDN and mesh networks', 'High-speed data on amateur spectrum.'],
        ['sdr-listening', 'SDR listening', 'RTL-SDR and software radios as receivers.'],
        ['raspberry-pi-and-arduino', 'Raspberry Pi and Arduino projects', 'Computing for radio.'],
        ['remote-operation', 'Remote stations', 'Operating a station over the internet.'],
      ]),
    ],
  },
  {
    slug: 'emergency', title: 'Emergency and public service', icon: 'emergency',
    blurb: 'How amateurs support their communities when normal communications fail.',
    subs: [
      sub('organizations', 'Organizations and programs', 'The groups amateurs serve through.', [
        ['ares-and-races', 'ARES and RACES', 'Organised emergency communications.'],
        ['skywarn', 'SKYWARN and weather spotting', 'Reporting severe weather.'],
        ['cert-and-community-events', 'CERT and community events', 'Supporting neighbours and events.'],
        ['nts-and-mars', 'NTS and MARS', 'Message-handling networks.'],
      ]),
      sub('practice', 'Emergency practice', 'The skills and kit for when it matters.', [
        ['emcomm-principles', 'Principles of emergency communication', 'What to do and what not to.'],
        ['incident-command-system', 'The Incident Command System', 'How responders are organised.'],
        ['net-control', 'Net control procedures', 'Running an emergency net.'],
        ['radiograms', 'Radiograms and message handling', 'Formal written traffic.'],
        ['winlink-emergency', 'Winlink for emergencies', 'Email when the internet is down.'],
        ['go-kits', 'Go kits and emergency power', 'What to pack and how to power it.'],
        ['public-service-events', 'Public service events', 'Marathons, parades and rides.'],
      ]),
    ],
  },
  {
    slug: 'safety', title: 'Safety, interference and compliance', icon: 'safety',
    blurb: 'Staying safe, and keeping your signal from causing (or suffering) trouble.',
    subs: [
      sub('safety', 'Safety', 'The hazards of the hobby, and how to manage them.', [
        ['rf-exposure', 'RF exposure', 'Heating effects and safe distances.'],
        ['electrical-safety', 'Electrical safety', 'Shock, fusing and wiring.'],
        ['tower-safety', 'Tower and climbing safety', 'Falling is the real hazard.'],
        ['lightning-safety', 'Lightning safety', 'Staying alive during storms.'],
        ['battery-and-fire-safety', 'Battery and fire safety', 'Lithium, lead-acid and what burns.'],
        ['soldering-safety', 'Soldering and chemical safety', 'Fumes, heat and lead.'],
        ['grounding-and-bonding', 'Grounding and bonding', 'Shock, lightning and RF grounds.'],
      ]),
      sub('interference', 'Interference and EMC', 'Who is interfering with whom, and how to fix it.', [
        ['rfi-and-emi', 'RFI and EMI overview', 'Sources and paths of interference.'],
        ['overload-and-intermod', 'Receiver overload and intermodulation', 'When strong signals cause trouble.'],
        ['harmonics-and-spurs', 'Harmonics and spurious emissions', 'Cleaning up your transmitter.'],
        ['tvi-and-consumer-electronics', 'Interference to consumer electronics', 'Your signal in their stereo.'],
        ['power-line-noise', 'Power-line and switching noise', 'Tracking down noise on the band.'],
        ['filters-and-ferrites-for-rfi', 'Filters and ferrites for RFI', 'Treating the problem.'],
        ['common-mode-and-ground-loops', 'Common-mode current and ground loops', 'The hidden path.'],
      ]),
    ],
  },
  {
    slug: 'reference', title: 'Tools, tables and references', icon: 'reference',
    blurb: 'Software, online services and quick-look tables.',
    subs: [
      sub('software', 'Software and online tools', 'What operators use besides the radio.', [
        ['propagation-tools', 'Propagation prediction tools', 'Forecasts and real-time maps.'],
        ['spotting-networks', 'DX clusters, RBN and PSK Reporter', 'Finding activity.'],
        ['callbooks-and-lookup', 'Callbooks and lookups', 'Who is that station?'],
        ['repeater-directories', 'Repeater directories', 'Finding repeaters.'],
      ]),
      sub('tables', 'Quick reference', 'Tables and formulas to keep handy.', [
        ['amateur-band-chart', 'Amateur band chart', 'The bands and their ranges.'],
        ['band-plans', 'Band plans', 'How the bands are divided by mode.'],
        ['coax-comparison', 'Coax comparison', 'Loss and power by cable type.'],
        ['wire-gauge-and-fusing', 'Wire gauge and fusing', 'Current ratings.'],
        ['formula-sheet', 'Formula sheet', 'The formulas an operator uses.'],
        ['glossary', 'Glossary', 'Terms from A to Z.'],
      ]),
    ],
  },
]

/** Articles shown first on the landing page. Paths are "section/sub/article". */
export const FEATURED: string[] = [
  'hobby/service/what-is-amateur-radio',
  'hobby/licensing/license-classes',
  'hobby/service/ways-to-get-on-the-air',
  'radio/waves/electromagnetic-waves',
  'antennas/fundamentals/how-antennas-work',
  'stations/how-radios-work/receiver-basics',
  'reference/tables/glossary',
]

// ───────────────────────── helpers ─────────────────────────

export interface FlatArticle extends ArticleDef {
  /** "section/sub/article" */
  path: string
  section: SectionDef
  sub: SubDef
  /** position in reading order */
  index: number
}

export const FLAT: FlatArticle[] = SECTIONS.flatMap((section) =>
  section.subs.flatMap((sub) =>
    sub.articles.map((a) => ({ ...a, path: `${section.slug}/${sub.slug}/${a.slug}`, section, sub, index: 0 })),
  ),
).map((a, i) => ({ ...a, index: i }))

const BY_PATH = new Map(FLAT.map((a) => [a.path, a]))
const BY_SLUG = new Map(FLAT.map((a) => [a.slug, a]))

export const articleCount = FLAT.length
export const getArticle = (path: string) => BY_PATH.get(path)
/** Articles can be referred to by full path or, since slugs are unique, by bare slug. */
export const resolveArticle = (ref: string) => BY_PATH.get(ref) ?? BY_SLUG.get(ref)
export const getSection = (slug: string) => SECTIONS.find((s) => s.slug === slug)
export const getSub = (section: string, sub: string) => getSection(section)?.subs.find((s) => s.slug === sub)
export const neighbours = (path: string) => {
  const a = BY_PATH.get(path)
  return { prev: a && a.index > 0 ? FLAT[a.index - 1] : undefined, next: a ? FLAT[a.index + 1] : undefined }
}
export const sectionArticleCount = (s: SectionDef) => s.subs.reduce((n, x) => n + x.articles.length, 0)
export const articleHref = (path: string) => `/compendium/${path}`
