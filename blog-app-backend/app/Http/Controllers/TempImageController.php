<?php

namespace App\Http\Controllers;

use App\Models\TempImage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class TempImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    




public function store(Request $request)
{
    // Validate incoming request data including file uploads
    $validator = Validator::make($request->all(), [
        'image' => 'required|image'  // 'image' should match the name attribute of your file input
    ]);

    // Check if validation fails
    if ($validator->fails()) {
        return response()->json([
            'status' => false,
            'message' => 'Please fix the errors',
            'errors' => $validator->errors()
        ], 422);  // Use 422 Unprocessable Entity status code for validation errors
    }

    // Upload image
    if ($request->hasFile('image')) {
        $image = $request->file('image');
        $ext = $image->getClientOriginalExtension(); // Correct method name
        $imageName = time() . '.' . $ext;

        // Store Image info in database
        $tempImage = new TempImage();
        $tempImage->name = $imageName;
        $tempImage->save();

        // Move image to temp directory
        $image->move(public_path('uploads/temp'), $imageName);

        return response()->json([
            'status' => true,
            'message' => 'Image uploaded successfully.',
            'data' => $tempImage
        ]);
    }

    // Return error response if file upload fails (this should ideally not happen with validation in place)
    return response()->json([
        'status' => false,
        'message' => 'Failed to upload image. Please try again.'
    ], 500); // Use appropriate status code for server errors
}

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
