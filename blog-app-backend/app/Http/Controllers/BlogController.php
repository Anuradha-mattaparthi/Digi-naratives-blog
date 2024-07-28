<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\TempImage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $blog = Blog::orderBy('created_at','DESC');
    if(!empty($request -> keyword)){
        $blog =$blog->where('title','like','%'.$request -> keyword.'%');
    }

       $blog = $blog->get();
       return response()->json([
        'status'=> true,
        'data'=> $blog
       ]);
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
        $validator = Validator::make($request->all(), [
            'title' => 'required|min:10',
            'author' => 'required|min:3',
            'shortDesc' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Please fix the errors',
                'errors' => $validator->errors()
            ]);
        }

        $blog = new Blog();
        $blog->title = $request->title;
        $blog->author = $request->author;
        $blog->description = $request->description;
        $blog->shortDesc = $request->shortDesc;
        $blog->save();
        // save image here and get image id
        $tempImage = TempImage::find($request->image_id);

        if ($tempImage != null) {
            $imageExtArray = explode('.', $tempImage->name);
            $extention = last($imageExtArray);
            $imageName = time(). '-' .$blog->id.'.'.$extention;
            $blog->image =$imageName;
            $blog->save();
            $sourcePath = public_path('uploads/temp/'.$tempImage->name);
            $destPath = public_path('uploads/blogsimages/'.$imageName);
            File::copy($sourcePath,$destPath);

        }
        return response()->json([
            'status' => true,
            'message' => 'Blog added successfully',
            'data' => $blog
        ]);
    }
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $blog =Blog::find($id);
        if($blog == null){
            return response()->json([
                'status' => false,
                'message' => 'Blog not found'
            ]);
        }
        $blog['date'] = \Carbon\Carbon::parse($blog->created_at)->format("d M,Y");
        return response()->json([
            'status' => true,
            'data' => $blog
        ]);

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
       $blog = Blog::find($id);
       if($blog == null){
        return response()->json([
            'status' => false,
            'message' => 'Blog not found'

        ]);
       }
        $validator = Validator::make($request->all(), [
            'title' => 'required|min:10',
            'author' => 'required|min:3',
            'shortDesc' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Please fix the errors',
                'errors' => $validator->errors()
            ]);
        }
        $blog->title = $request->title;
        $blog->author = $request->author;
        $blog->description = $request->description;
        $blog->shortDesc = $request->shortDesc;
        $blog->save();
        // save image here and get image id
        $tempImage = TempImage::find($request->image_id);

        if ($tempImage != null) {
             //Delete old image

             File::delete(public_path('uploads/blogsimages/'.$blog->image));

            $imageExtArray = explode('.', $tempImage->name);
            $extention = last($imageExtArray);
            $imageName = time(). '-' .$blog->id.'.'.$extention;
            $blog->image =$imageName;
            $blog->save();
            $sourcePath = public_path('uploads/temp/'.$tempImage->name);
            $destPath = public_path('uploads/blogsimages/'.$imageName);
            File::copy($sourcePath,$destPath);

        }
        return response()->json([
            'status' => true,
            'message' => 'Blog updated successfully',
            'data' => $blog
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $blog = Blog::find($id);
        if($blog == null) {
            return response()->json([
                'status' => false,
                'message' => 'Blog not found'

            ]);
        }

        //Delete blog image first

        File::delete(public_path('uploads/blogsimages/'.$blog->image));

        //Delete blog from DB
        $blog->delete();

        return response()->json([
            'status' => true,
            'message' => 'Blog delete successfully',
            'data' => $blog
        ]);
    }
}
