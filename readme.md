Page Slider
-----------

A very simple *jQuery plugin to make cool looking, efficient, bookmarkable sliding panels. Works great with mobile and responsive designs.

Author
------

Rodrigo Silveira - http://www.rodrigo-silveira.com 

How to
------

(For a functional example, see the included html file.)

After including the Javascript file, and some CSS to make things look right, set up your document with the following structure:

'''<div id="pageSliderWidget">
      <div id="pageSlider">
         <div class="pageSliderPanel" id="panel_num_1">
            <button data-intent="scroll-previous">&laquo;</button>
            <button data-intent="scroll-next">&raquo;</button>
         </div>
         <div class="pageSliderPanel" id="panel_num_2">
            <button data-intent="scroll-previous">&laquo;</button>
            <button data-intent="scroll-next">&raquo;</button>
         </div>
         <div class="pageSliderPanel" id="panel_num_3">
            <button data-intent="scroll-previous">&laquo;</button>
            <button data-intent="scroll-next">&raquo;</button>
         </div>
      </div>
   </div>
'''
Inside each panel you'll need a way to navigate through the pages. Right now this is done with the <button> elements with the special data-intent of scroll-next and scroll-previous.

To set the Javascript plugin in action, simply create an instance of the PageSlider class, tell it what needs to behave as a sliding page, and you're done!

'''$(function(){
      var slider = new PageSlider($("#pageSlider"));
      $(window).bind("hashchange", slider.gotoHash);
      slider.run();
   });
'''
*
-

Note: this is not technically a jQuery plugin, but rather a Javascript class that relies on jQuery to work.
