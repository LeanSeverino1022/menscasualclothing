$(document).ready(() => {
  if (jQuery) {  
    // request variable
    let xhr = null

    // Set variables for image elements
    const leadViewElement    = $('img#leadView')
    const frontViewElement   = $('img#frontView')
    const backViewElement    = $('img#backView')
    const flatViewElement    = $('img#flatView')

    // Set variables for clothes part sections/colors
    const frontBodyColorsElement           = $('div#collapseFrontBody > div.card.card-body')
    const backBodyColorsElement            = $('div#collapseBackBody > div.card.card-body')
    const sleevesColorsElement             = $('div#collapseSleeves > div.card.card-body')
    const collarAndPlacketColorsElement    = $('div#collapseCollarAndPlacket > div.card.card-body')
    const pocketColorsElement              = $('div#collapsePocket > div.card.card-body')
    const pipingColorsElement              = $('div#collapsePiping > div.card.card-body')
    const logoColorsElement                = $('div#collapseLogo > div.card.card-body')

    // abortableWhen function
    // This function will create a $.when function whose requests are abortable
    // in the event of request spamming
    function abortableWhen($, xhrs) {
      return {
        abort: () => {
          xhrs.map(request => request.abort())
        },

        // Return $.when as a promise.
        // $.when waits for all the requests to finish before continuing
        promise: $.when(
          ...xhrs
        )
      }
    }

    // Options Requesting function
    // This function will do the requesting and fetching the active values for the request query string.
    function optionsRequest($) {

      // Fetch option values
      const o1 = $("img.item-color-option.active[data-target='o1']").data().color;
      const o2 = $("img.item-color-option.active[data-target='o2']").data().color;
      const o3 = $("img.item-color-option.active[data-target='o3']").data().color;
      const o4 = $("img.item-color-option.active[data-target='o4']").data().color;
      const o5 = $("img.item-color-option.active[data-target='o5']").data().color;
      const o6 = $("img.item-color-option.active[data-target='o6']").data().color;
      const o7 = $("img.item-color-option.active[data-target='o7']").data().color;
      

      // if a request already exists, then abort it to avoid spamming
      // and response overlap.
      if (xhr)
        xhr.abort()

      //  Create the request
      //  THESE ARE THE REQUEST, YOU'LL HAVE TO MAKE THE CHANGES HERE
      xhr = abortableWhen(jQuery, [
        // Front
        jQuery.get(`https://everthreadapi.com/api/v1/api_thumb_view_db.php?rid=54&augmentID=5500&format=NOTbase64&patternID=1&isThumb=0&color1=ffffff&color2=&color3=&color4=&scaleSize=1&isr=1&angle=2&${constructQueryString([o1, o2, o3, o4, o5, o6])}`),
        // Back
        jQuery.get(`https://everthreadapi.com/api/v1/api_thumb_view_db.php?rid=54&augmentID=5500&format=NOTbase64&patternID=1&isThumb=0&color1=ffffff&color2=&color3=&color4=&scaleSize=1&isr=1&angle=3&${constructQueryString([o7, o2, o3, o4, o5, o6])}`),
        // Flat
        jQuery.get(`https://everthreadapi.com/api/v1/api_thumb_view_db.php?rid=54&augmentID=5500&format=NOTbase64&patternID=1&isThumb=0&color1=ffffff&color2=&color3=&color4=&scaleSize=1&isr=1&angle=1&${constructQueryString([o1, o2, o3, o4, o5, o6])}`)
      ])
        
      return xhr.promise
        .done((image1, image2, image3) => {
          // Set image values once response is done
          leadViewElement.attr('src', $(image1[0]).attr('src'))
          frontViewElement.attr('src', $(image1[0]).attr('src'))
          backViewElement.attr('src', $(image2[0]).attr('src'))
          flatViewElement.attr('src', $(image3[0]).attr('src'))

          // Clear request
          xhr = null

          return true
        })
        .catch((error1, error2, error3) => {
          console.log('error1', error1)
          console.log('error2', error2)
          console.log('error3', error3)

          return true
        })
    }

    // construct query string for the request
    function constructQueryString(optionsArray) {

      return optionsArray.filter(option => option)
        .map((item, idx) => `o${idx + 1}=${idx + 1}-${item}`)
        .join('&');
    }

    // Click Image Preview Functions
    frontViewElement.click(function() {
      leadViewElement.attr('src', $(this).attr('src'))
    })

    backViewElement.click(function() {
      leadViewElement.attr('src', $(this).attr('src'))
    })

    flatViewElement.click(function() {
      leadViewElement.attr('src', $(this).attr('src'))
    })

    // FRONT BODY COLOR OPTION CLICK EVENT HANDER
    $("img.item-color-option[data-target='o1']").click(function() {
      // If options already selected, do nothing
      if ($(this).hasClass('active')){
        return null
      }

      $("img.item-color-option.active[data-target='o1']").removeClass('active')

      $(this).addClass('active')

      return optionsRequest(jQuery)
    })

    // SLEEVES COLOR OPTION CLICK EVENT HANDER
    $("img.item-color-option[data-target='o2']").click(function() {
      // If options already selected, do nothing
      if ($(this).hasClass('active')){
        return null
      }

      $("img.item-color-option.active[data-target='o2']").removeClass('active')

      $(this).addClass('active')

      return optionsRequest(jQuery)
    })

    // COLLAR AND PLACKET COLOR OPTION CLICK EVENT HANDER
    $("img.item-color-option[data-target='o3']").click(function() {
      // If options already selected, do nothing
      if ($(this).hasClass('active')){
        return null
      }

      $("img.item-color-option.active[data-target='o3']").removeClass('active')

      $(this).addClass('active')

      return optionsRequest(jQuery)
    })

    // POCKET COLOR OPTION CLICK EVENT HANDER
    $("img.item-color-option[data-target='o4']").click(function() {
      // If options already selected, do nothing
      if ($(this).hasClass('active')){
        return null
      }

      $("img.item-color-option.active[data-target='o4']").removeClass('active')

      $(this).addClass('active')

      return optionsRequest(jQuery)
    })

    // PIPING COLOR OPTION CLICK EVENT HANDER
    $("img.item-color-option[data-target='o5']").click(function() {
      // If options already selected, do nothing
      if ($(this).hasClass('active')){
        return null
      }

      $("img.item-color-option.active[data-target='o5']").removeClass('active')

      $(this).addClass('active')

      return optionsRequest(jQuery)
    })

    // LOGO COLOR OPTION CLICK EVENT HANDER
    $("img.item-color-option[data-target='o6']").click(function() {
      // If options already selected, do nothing
      if ($(this).hasClass('active')){
        return null
      }

      $("img.item-color-option.active[data-target='o6']").removeClass('active')

      $(this).addClass('active')

      return optionsRequest(jQuery)
    })

    // BACK BODY COLOR OPTION CLICK EVENT HANDER
    $("img.item-color-option[data-target='o7']").click(function () {
      // If options already selected, do nothing
      if ($(this).hasClass('active')) {
        return null
      }

      $("img.item-color-option.active[data-target='o7']").removeClass('active')

      $(this).addClass('active')

      return optionsRequest(jQuery)
    })

  }
});