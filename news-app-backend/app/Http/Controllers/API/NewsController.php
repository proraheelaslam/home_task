<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\Controller;

class NewsController extends Controller
{
    private $newsApiKey;
    private $openNewsApiKey;
    private $newsCredApiKey;

    public function __construct()
    {
        $this->newsApiKey = env('NEWS_API_KEY');
        $this->openNewsApiKey = env('OPENNEWS_API_KEY');
        $this->newsCredApiKey = env('NEWSCRED_API_KEY');
    }

    public function searchArticles(Request $request)
    {
        $query = $request->query('q', '');
        $date = $request->query('from', '');
        $category = $request->query('category', '');
        $sources = $request->query('sources', '');

        // Determine which endpoint to call based on the presence of category or query
        if (!empty($category) && empty($query)) {
            // If category is provided but no query, fetch top headlines for the category
            $newsApiResponse = Http::get("https://newsapi.org/v2/top-headlines", [
                'apiKey' => $this->newsApiKey,
                'category' => $category,
                'country' => 'us', // Optional: Add default country if necessary
                'sources' => $sources,
            ]);
        } elseif (!empty($query) || !empty($date) || !empty($sources)) {
            // If query, date, or sources are provided, fetch filtered news from the 'everything' endpoint
            // Ensure 'q' is always included to avoid broad searches
            $newsApiResponse = Http::get("https://newsapi.org/v2/everything", [
                'apiKey' => $this->newsApiKey,
                'q' => $query ?: 'latest', // Default query to 'latest' if empty
                'from' => $date,
                'sources' => $sources,
            ]);
        } else {
            // If no search or category is provided, fetch top headlines
            $newsApiResponse = Http::get("https://newsapi.org/v2/top-headlines", [
                'apiKey' => $this->newsApiKey,
                'country' => 'us', // Default country or any fallback logic
            ]);
        }

        // Handle the response from the API
        $news = $newsApiResponse->json();

        // Check if API response is successful
        if ($news['status'] === 'error') {
            // Return a meaningful error message
            return response()->json(['error' => $news['message']], $newsApiResponse->status());
        }

        // Combine and return the results
        return response()->json([
            'newsApi' => $news,
        ]);
    }

    public function personalizedFeed(Request $request)
    {
        $sources = $request->query('sources', '');
        $categories = $request->query('category', ''); // Changed from 'categories' to match 'category'

        // Fetch from NewsAPI
        $newsApiResponse = Http::get("https://newsapi.org/v2/top-headlines", [
            'apiKey' => $this->newsApiKey,
            'sources' => $sources,
            'category' => $categories,
            'country' => 'us', // Optional: Add default country if necessary
        ]);

        // Handle the response from the API
        $news = $newsApiResponse->json();

        // Check if API response is successful
        if ($news['status'] === 'error') {
            // Return a meaningful error message
            return response()->json(['error' => $news['message']], $newsApiResponse->status());
        }

        // Return the response
        return response()->json($news);
    }
}

