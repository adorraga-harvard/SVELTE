<script>
  // No script needed here unless you add reactive elements specific to the summary itself.
</script>

<div class="main-info-content">
  <div class="sticky-main-header"  >
    <h2 class="main-info-title ">Leading Digital Government: <b class="shady text-amber-400">LTO</b></h2>
    <p class="main-info-intro">
      Welcome to a streamlined approach to public service. Our integrated portal empowers citizens with direct access
      to critical government applications, designed for efficiency, transparency, and ease of use.
    </p>
  </div>

  <div class="scrollable-main-body">
    <div class="app-highlights">
      <div class="highlight-item">
        <h4><span class="icon">🛒</span> Purchase</h4>
        <p>Manage procurement & payments. View history & ensure compliance.</p>
      </div>
      <div class="highlight-item">
        <h4><span class="icon">📜</span> Notary</h4>
        <p>Digitize & secure legal document validation. Track official endorsements easily.</p>
      </div>
      <div class="highlight-item">
        <h4><span class="icon">🛡️</span> Insurance</h4>
        <p>
          Facilitates the issuance and management of Vehicle and/or Individual Insurance Policies, crucial for LTO registration.
        </p>
      </div>
      <div class="highlight-item">
        <h4><span class="icon">✅</span> Clearance</h4>
        <p>
          Verifies that the Vehicle and Owner have no pending legal issues, a prerequisite for LTO registration.
        </p>
      </div>
      <div class="highlight-item">
        <h4><span class="icon">📝</span> Registration</h4>
        <p>Effortlessly handle all government registrations: permits, civil records, renewals & inquiries.</p>
      </div>
    </div>
    <p class="main-info-closing">
        <span class="highlight-text">Experience the ease of modern governance.</span>
    </p>

    <div class="flow-diagram-section">
      <h3>Portal Flow & Key Prerequisites</h3>
      <p class="flow-intro">Navigate essential service dependencies for smooth processing.</p>
      <div class="diagram-elements">
        <div class="flow-step">Purchase <span class="arrow">➡️</span></div>
        <div class="flow-step">Notary <span class="arrow">➡️</span></div>
        <div class="flow-group">
            <div class="flow-step">Clearance</div>
            <div class="flow-connector-group">
                <span class="vertical-line"></span>
                <span class="horizontal-line"></span>
                <span class="circle"></span>
            </div>
            <div class="flow-step">Insurance</div>
        </div>
        <div class="flow-step final-step">Registration</div>
      </div>
      <p class="flow-note">
        <span class="bold-note">Note:</span> <span class="highlight-text">Registration</span> requires both <span class="highlight-text">Clearance</span> and <span class="highlight-text">Insurance</span> completion for the issuance of OR, CR, & License Plates.
      </p>
    </div>
  </div>
</div>

<style>
  /* All styles for .main-info-content and its children go here */

  .main-info-content {
    display: flex;
    flex-direction: column;
    height: 100%; /* Make main-info-content fill its container vertically */
    padding: 0; /* Padding is handled by sub-elements */
    text-align: center; /* Center content horizontally by default */
  }

  .sticky-main-header {
    position: sticky;
    top: 0; /* Sticks to the top of its parent scrolling container (.main-info-content) */
    background-color: #ffffff;
    z-index: 10; /* Ensures header stays on top of scrolling content */
    padding: 15px 15px 10px;
    border-bottom: 1px solid #e0e0e0;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08); /* Subtle shadow for "lift" effect */
    flex-shrink: 0; /* Prevent header from shrinking when content grows */
  }

  .main-info-title {
    font-size: 1.8em;
    color: #0056b3;
    margin-bottom: 0.8em;
    font-weight: 700;
    padding-top: 0;
  }

  .main-info-intro {
    font-size: 0.95em;
    line-height: 1.5;
    margin-bottom: 0;
    max-width: 650px;
    color: #555;
    margin-left: auto;
    margin-right: auto;
  }

  .scrollable-main-body {
    flex-grow: 1; /* Allows this section to fill remaining space */
    overflow-y: auto; /* Makes this specific div scrollable if content overflows */
    padding: 15px; /* Padding for the scrollable content area */
  }

  .app-highlights {
    display: flex; /* Changed to flex for single column */
    flex-direction: column; /* Stack items vertically */
    gap: 10px; /* Adjusted gap for items within highlights */
    width: 100%;
    max-width: 850px;
    margin: 0 auto 1.5em auto; /* Center with auto margins for fixed width */
  }

  .highlight-item {
    background-color: #f0f8ff;
    border-left: 4px solid #3498db;
    padding: 12px;
    border-radius: 8px;
    text-align: left;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  }

  .highlight-item:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  }

  .highlight-item h4 {
    font-size: 1.1em;
    color: #0056b3;
    margin-top: 0;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    font-weight: 600;
  }

  .highlight-item .icon {
    font-size: 1.3em;
    margin-right: 8px;
    color: #2980b9;
  }

  .highlight-item p {
    font-size: 0.85em;
    line-height: 1.4;
    color: #666;
  }

  .main-info-closing {
    font-size: 0.9em;
    margin-top: 1em;
    color: #777;
    font-style: italic;
    text-align: center; /* Ensure closing text is centered */
  }

  /* --- Portal Flow Diagram Styles --- */
  .flow-diagram-section {
    margin-top: 2em;
    padding-top: 1.5em;
    border-top: 1px dashed #ccc;
    width: 100%;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .flow-diagram-section h3 {
    font-size: 1.4em;
    color: #007bff;
    margin-bottom: 0.8em;
    font-weight: 700;
  }

  .flow-intro {
    font-size: 0.9em;
    color: #666;
    margin-bottom: 1.2em;
  }

  .diagram-elements {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: 0 auto 1.5em auto; /* Center with auto margins for fixed width */
  }

  .flow-step {
    background-color: #f8f9fa;
    border: 1px solid #ced4da;
    padding: 8px 12px;
    margin: 5px;
    border-radius: 18px;
    font-weight: 600;
    color: #495057;
    display: flex;
    align-items: center;
    white-space: nowrap;
    font-size: 0.85em;
  }

  .flow-step .arrow {
    margin-left: 6px;
    color: #007bff;
    font-weight: 700;
    font-size: 1.1em;
  }

  .flow-group {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 5px;
  }

  .flow-connector-group {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 5px 0;
      position: relative;
  }

  .vertical-line {
      width: 2px;
      height: 20px;
      background-color: #6c757d;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1;
  }

  .horizontal-line {
      width: 40px;
      height: 2px;
      background-color: #6c757d;
      position: relative;
      z-index: 0;
  }

  .circle {
      width: 8px;
      height: 8px;
      background-color: #6c757d;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      z-index: 2;
  }

  .final-step {
    background-color: #d1ecf1;
    border-color: #007bff;
    color: #007bff;
    font-weight: 700;
  }

  .flow-note {
    font-size: 0.8em;
    color: #666;
    line-height: 1.3;
    max-width: 450px;
    margin: 1em auto 0;
  }

  .flow-note .bold-note {
    font-weight: 700;
    color: #333;
  }
</style>