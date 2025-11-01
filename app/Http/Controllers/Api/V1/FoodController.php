<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Food;
use App\Models\FoodCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FoodController extends Controller
{
    /**
     * Display a listing of foods.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $query = Food::with('category');

        // Filter by name if provided
        if ($request->has('name')) {
            $query->searchByName($request->name);
        }

        // Filter by category_id if provided
        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        // Sort options
        $sortby = $request->get('sortby', 'name');
        $sortorder = $request->get('sortorder', 'asc');
        if ($sortby === 'random') {
            $query->inRandomOrder();
        } else {
            $query->orderBy($sortby, $sortorder);
        }

        // Pagination parameters
        $itemsPerPage = $request->get('per_page', 15);
        $currentPage = $request->get('page', 1);
        
        // Check if hybrid mode is enabled
        $isHybrid = $request->boolean('hybrid', false);
        
        if ($isHybrid) {
            // Hybrid pagination logic
            $pagesPerFetch = 5;
            $startItem = (floor(($currentPage - 1) / $pagesPerFetch) * $pagesPerFetch * $itemsPerPage);
            $totalItems = $itemsPerPage * $pagesPerFetch;

            $foods = $query
                ->skip($startItem)
                ->take($totalItems)
                ->get();

            $total = $query->count();

            if(env('APP_DEBUG', false)){
                $debug = [
                    'sql' => $query->toSql(),
                    'bindings' => $query->getBindings()
                ];
            }

            return response()->json([
                'success' => true,
                $debug ?? [],
                'data' => [
                    'items' => $foods,
                    'total' => $total,
                    'itemsPerPage' => $itemsPerPage,
                    'currentPage' => (int) $currentPage,
                    'pagesPerFetch' => $pagesPerFetch,
                    'isHybrid' => true
                ]
            ]);
        } else {
            // Normal pagination
            $foods = $query->paginate($itemsPerPage);

            if(env('APP_DEBUG', false)){
                $debug = [
                    'sql' => $query->toSql(),
                    'bindings' => $query->getBindings()
                ];
            }
            
            return response()->json([
                'success' => true,
                $debug ?? [],
                'data' => [
                    'items' => $foods->items(),
                    'total' => $foods->total(),
                    'itemsPerPage' => $itemsPerPage,
                    'currentPage' => $foods->currentPage(),
                    'lastPage' => $foods->lastPage(),
                    'isHybrid' => false
                ]
            ]);
        }
    }

    /**
     * Display the specified food.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $food = Food::with('category')->find($id);

        if (!$food) {
            return response()->json([
                'success' => false,
                'message' => 'Food not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $food,
        ]);
    }

    /**
     * Store a newly created food in storage.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'category_id' => 'required|exists:food_categories,id',
            'energy_kj' => 'required|numeric|min:0',
            'calories_kcal' => 'required|numeric|min:0',
            'protein_g' => 'numeric|min:0',
            'carbohydrate_g' => 'numeric|min:0',
            'fat_g' => 'numeric|min:0',
            'saturated_fat_g' => 'numeric|min:0',
            'monounsaturated_fat_g' => 'numeric|min:0',
            'polyunsaturated_fat_g' => 'numeric|min:0',
            'cholesterol_mg' => 'numeric|min:0',
            'fiber_g' => 'numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $food = Food::create($request->all());

        return response()->json([
            'success' => true,
            'data' => $food,
            'message' => 'Food created successfully',
        ], 201);
    }

    /**
     * Update the specified food in storage.
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $food = Food::find($id);

        if (!$food) {
            return response()->json([
                'success' => false,
                'message' => 'Food not found',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'string|max:255',
            'description' => 'nullable|string',
            'price' => 'numeric|min:0',
            'category_id' => 'exists:food_categories,id',
            'image' => 'nullable|string',
            'is_available' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $food->update($request->all());

        return response()->json([
            'success' => true,
            'data' => $food,
            'message' => 'Food updated successfully',
        ]);
    }

    /**
     * Remove the specified food from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $food = Food::find($id);

        if (!$food) {
            return response()->json([
                'success' => false,
                'message' => 'Food not found',
            ], 404);
        }

        $food->delete();

        return response()->json([
            'success' => true,
            'message' => 'Food deleted successfully',
        ]);
    }

    /**
     * Get all food categories.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function categories()
    {
        $categories = FoodCategory::all();

        return response()->json([
            'success' => true,
            'data' => $categories,
        ]);
    }

    /**
     * Get foods by category.
     *
     * @param int $categoryId
     * @return \Illuminate\Http\JsonResponse
     */
    public function getByCategory($categoryId)
    {
        $foods = Food::with('category')
            ->where('category_id', $categoryId)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $foods,
        ]);
    }
}
