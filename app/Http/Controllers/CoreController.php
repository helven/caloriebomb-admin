<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class CoreController extends Controller
{
    protected $sharedViewData = array();

    function __construct()
    {
        //\Debugbar::disable();
        //$this->v_data	= array();
    }
}
