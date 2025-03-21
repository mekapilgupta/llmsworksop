<script>
    import { onMount } from 'svelte';
    import { fetchMarketData } from '../modules/fetchData.js';
    import { cleanText } from '../modules/cleanData.js';
    import { analyzeMarket } from '../modules/aiAdvisor.js';

    let analysisResult = '';
    let loading = false;
    let step = 0; // 0: Not started, 1: Fetching, 2: Cleaning, 3: Analyzing, 4: Complete
    let rawData = '';
    let cleanedData = '';
    const openRouterKey = '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';

    const startAnalysis = async () => {
        step = 1;
        loading = true;
        analysisResult = '';
        rawData = '';
        cleanedData = '';

        try {
            // Step 1: Fetch raw HTML
            rawData = await fetchMarketData();
            step = 2;

            // Step 2: Clean data
            cleanedData = cleanText(rawData);
            step = 3;

            // Step 3: Get AI analysis
            const analysis = await analyzeMarket(cleanedData, openRouterKey);
            analysisResult = analysis;
            step = 4;
        } catch (error) {
            analysisResult = `🚨 Error: ${error.message}`;
            step = 0;
        } finally {
            loading = false;
        }
    };
</script>

<main>
    <header>
        <img src="https://ai-researchstudies.com/wp-content/uploads/2023/04/Logo_AI_Researcher_3-2.png" alt="AI Research Logo" class="logo" />
        <h1>🔬 AI Market Research Lab</h1>
        <p>Powered by cutting-edge AI for actionable market insights.</p>
    </header>

    <section class="steps">
        <h2>📊 Research Progress</h2>
        <div class="progress-container">
            <div class="progress-bar" style={`width: ${step * 25}%;`}></div>
        </div>
        <ol>
            <li class:active={step >= 1}>🔍 Fetching Market Data...</li>
            <li class:active={step >= 2}>🧹 Cleaning Raw Data...</li>
            <li class:active={step >= 3}>🤖 Analyzing with AI...</li>
            <li class:active={step >= 4}>📊 Analysis Complete!</li>
        </ol>
    </section>

    {#if step === 0}
        <button on:click={startAnalysis} class="action-button">
            🚀 Start Today’s Market Research
        </button>
    {:else}
        <button disabled class="action-button">
            {loading ? '🔄 Processing...' : '📊 Research in Progress'}
        </button>
    {/if}

    {#if step >= 1}
        <div class="data-section">
            <h3>📥 Raw Market Data</h3>
            <pre>{rawData || 'Fetching data...'}</pre>
        </div>
    {/if}

    {#if step >= 2}
        <div class="data-section">
            <h3>🧹 Cleaned Data</h3>
            <pre>{cleanedData || 'Cleaning data...'}</pre>
        </div>
    {/if}

    {#if step >= 3 && step < 4}
        <div class="ai-animation">
            <h3>🤖 AI Analysis in Progress</h3>
            <div class="spinner"></div>
            <p>Our AI is crunching the numbers. Hang tight!</p>
        </div>
    {/if}

    {#if step === 4}
        <div class="analysis">
            <h3>📈 AI Analysis Result</h3>
            <pre>{analysisResult}</pre>
        </div>
    {/if}
</main>

<style>
    main {
        font-family: 'Arial', sans-serif;
        padding: 2rem;
        background-color: #f0f4f8;
        border-radius: 12px;
        max-width: 800px;
        margin: auto;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    header {
        text-align: center;
        margin-bottom: 2rem;
    }

    .logo {
        width: auto;
        height: 100px;
        margin-bottom: 1rem;
    }

    .steps {
        background: #e7f3fe;
        padding: 1.5rem;
        border-radius: 12px;
        margin-bottom: 1.5rem;
    }

    .progress-container {
        width: 100%;
        background: #d1e9ff;
        border-radius: 8px;
        margin: 1rem 0;
        overflow: hidden;
    }

    .progress-bar {
        height: 10px;
        background: #007bff;
        transition: width 0.5s ease;
    }

    ol {
        list-style-type: none;
        padding: 0;
    }

    li {
        padding: 0.5rem;
        margin: 0.5rem 0;
        border-radius: 4px;
        background: #f9f9f9;
        transition: background 0.3s;
    }

    li.active {
        background: #007bff;
        color: white;
    }

    .action-button {
        padding: 1rem 2rem;
        margin: 1rem 0;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1.1rem;
        transition: background 0.3s;
    }

    .action-button:hover {
        background: #0056b3;
    }

    .action-button:disabled {
        background: #cccccc;
        cursor: not-allowed;
    }

    .data-section, .analysis {
        margin-top: 2rem;
        padding: 1.5rem;
        background: #ffffff;
        border-radius: 12px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    pre {
        white-space: pre-wrap;
        word-wrap: break-word;
        background: #f9f9f9;
        padding: 1rem;
        border-radius: 8px;
    }

    .ai-animation {
        text-align: center;
        margin-top: 2rem;
    }

    .spinner {
        border: 4px solid #f3f3f3;
        border-top: 4px solid #007bff;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
        margin: 1rem auto;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>