<!DOCTYPE html>
<html lang="en">

  <head>
  
  <base target="_self">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">

  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">

  <script>
  

  google.script.run.withSuccessHandler(showImages).getNewsRssFeed();

  
  function showImages(dataArray){
    $(document).ready(function(){
      $.each( dataArray, function( index, value ) {
          $('img').eq(index).attr("src", value[3]);
          
      });
      $('#fetch_news').hide();
    });
  }

  $(window).bind('orientationchange', function (event) {
    
    
      
      
  });

  $(function(){
    $('a[title]').tooltip();
  });
</script>   
  <style>
    .zoom:hover {
      position: relative;
      align: center;
      z-index: 1;
      
    }
    .card:hover {
      border: 5px solid #3E7DC0 !important;
      
    }
    .card-img-top {
      
      width: 100vw; 
      height: calc(120px + 1.5vw);
      
      
      
      
      
      
    }

    @media screen and (orientation:landscape) {
      
      
       
       
      
    }

    body {
      
      color: #666666; font-family: 'Open Sans';
      
      font-size: calc(24px - 1vw);
      
      
      line-height: calc(1.1em + 0.5vw);
    }
</style>  

  </head>

  <body>
	  <div class="container-fluid bg-white">
    	<div class="row row-cols-1" id="fetch_news">
        <div class="col my-4">
          <div class="card border-0">
            <br/><br/><br/>
            <strong><center>   
              <div class="spinner-border spinner-border-lg text-warning justify-content-center" role="status" ></div><br/>
              Loading News...
            </center></strong>
          </div>    
        </div>      
      </div>        
        
      <div class="row">
        
                          <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://thehackernews.com/2022/01/microsoft-issues-fix-for-exchange-y2k22.html' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> Microsoft Issues Fix for Exchange Y2K22 Bug That Crippled Email Delivery Service </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>January 2, 2022</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                  <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://thehackernews.com/2021/12/new-ilobleed-rootkit-targeting-hp.html' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> New iLOBleed Rootkit Targeting HP Enterprise Servers with Data Wiping Attacks </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>December 30, 2021</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                  <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://threatpost.com/rise-cyber-recon-security-strategy/177317/' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> What the Rise in Cyber-Recon Means for Your Security Strategy </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>December 30, 2021</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                  <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://nakedsecurity.sophos.com/2021/12/30/instagram-copyright-infringment-scams-dont-get-sucked-in/' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> Instagram copyright infringment scams – don’t get sucked in! </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>December 30, 2021</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                  <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://securityintelligence.com/posts/intelligent-adversary-engagement-deceiving-attacker/' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> Intelligent Adversary Engagement: Deceiving the Attacker </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>December 30, 2021</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                  <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://threatpost.com/aquatic-panda-log4shell-exploit-tools/177312/' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> APT ‘Aquatic Panda’ Targets Universities with Log4Shell Exploit Tools </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>December 30, 2021</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                  <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://threatpost.com/ecommerce-bots-domain-registration-account-fraud/177305/' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> Threat Advisory: E-commerce Bots Use Domain Registration Services for Mass Account Fraud </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>December 29, 2021</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                  <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://krebsonsecurity.com/2021/12/happy-12th-birthday-krebsonsecurity-com/' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> Happy 12th Birthday, KrebsOnSecurity.com! </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>December 29, 2021</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                  <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://thehackernews.com/2021/12/chinese-apt-hackers-used-log4shell.html' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> Chinese APT Hackers Used Log4Shell Exploit to Target Academic Institution </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>December 30, 2021</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                  <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://www.tripwire.com/state-of-security/security-data-protection/cloud/improving-edge-computing-security/' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> Improving Edge Computing Security in 2022 </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>December 30, 2021</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                  <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://threatpost.com/cryptomining-attack-exploits-docker-api-misconfiguration-since-2019/177299/' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> Cryptomining Attack Exploits Docker API Misconfiguration Since 2019 </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>December 29, 2021</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                  <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://nakedsecurity.sophos.com/2021/12/29/log4shell-vulnerability-number-four-much-ado-about-something/' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> Log4Shell vulnerability Number Four: “Much ado about something” </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>December 29, 2021</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                  <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://threatpost.com/5-cybersecurity-trends-2022/177273/' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> 5 Cybersecurity Trends to Watch in 2022 </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>December 29, 2021</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                  <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://securityintelligence.com/posts/changing-conversation-risk-quantification/' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> Changing the Conversation with Risk Quantification </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>December 28, 2021</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                  <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://thehackernews.com/2021/12/ongoing-autom-cryptomining-malware.html' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> Ongoing Autom Cryptomining Malware Attacks Using Upgraded Evasion Tactics </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>December 29, 2021</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                  <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://thehackernews.com/2021/12/new-apache-log4j-update-released-to.html' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> New Apache Log4j Update Released to Patch Newly Discovered Vulnerability </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>December 28, 2021</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                  <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://www.tripwire.com/state-of-security/security-data-protection/cloud/will-zero-trust-shape-the-future-of-cloud-security/' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> Will Zero Trust Shape the Future of Cloud Security? </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>December 29, 2021</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                  <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://securityintelligence.com/articles/2021-zero-trust-security-intelligence-roundup/' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> 2021 Zero Trust Security Intelligence Roundup </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>December 28, 2021</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                  <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://www.tripwire.com/state-of-security/security-data-protection/cyber-security/protect-your-organization-by-cultivating-a-culture-of-cybersecurity-awareness/' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> Protect Your Organization by Cultivating a Culture of Cybersecurity 
Awareness </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>December 28, 2021</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                  <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://securityintelligence.com/articles/2021-manufacturing-supply-chain-security-roundup/' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> 2021 Manufacturing and Supply Chain Security Roundup </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>December 27, 2021</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                  <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://www.itsecurityguru.org/2021/12/24/the-it-security-guru-buyers-guide-2022/?utm_source=rss&amp;utm_medium=rss&amp;utm_campaign=the-it-security-guru-buyers-guide-2022' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> The IT Security Guru Buyer’s Guide 2022 </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>December 24, 2021</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                  <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://www.welivesecurity.com/2021/12/30/22-cybersecurity-statistics-know-2022/' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> 22 cybersecurity statistics to know for 2022 </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>December 24, 2021</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                  <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://www.itsecurityguru.org/2021/12/24/flaw-behind-gatekeeper-bypass-fixed-on-macos/?utm_source=rss&amp;utm_medium=rss&amp;utm_campaign=flaw-behind-gatekeeper-bypass-fixed-on-macos' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> Flaw behind Gatekeeper bypass fixed on macOS </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>December 24, 2021</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                  <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://www.welivesecurity.com/2021/12/27/2021-review-biggest-cybersecurity-stories-year/' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> 2021 in review: The biggest cybersecurity stories of the year </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>December 24, 2021</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                  <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://www.itsecurityguru.org/2021/12/24/unique-cyber-attacks-declined-for-the-first-time-in-3-years/?utm_source=rss&amp;utm_medium=rss&amp;utm_campaign=unique-cyber-attacks-declined-for-the-first-time-in-3-years' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> Unique cyber-attacks declined for the first time in 3 years </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>December 24, 2021</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                  <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://www.welivesecurity.com/2021/12/22/holiday-season-give-children-gift-cybersecurity-awareness/' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> This holiday season, give your children the gift of cybersecurity awareness </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>December 24, 2021</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                  <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://www.wired.com/story/worst-hacks-2021' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> The Worst Hacks of 2021 </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>December 24, 2021</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                  <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://www.itsecurityguru.org/2021/12/24/new-coinspot-phishing-campaign-discovered/?utm_source=rss&amp;utm_medium=rss&amp;utm_campaign=new-coinspot-phishing-campaign-discovered' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> New CoinSpot phishing campaign discovered </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>December 24, 2021</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                  <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://www.welivesecurity.com/2021/12/20/dont-forget-unplug-devices-before-you-leave-holidays/' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> Don’t forget to unplug your devices before you leave for the holidays! </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>December 24, 2021</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                  <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://nakedsecurity.sophos.com/2021/12/24/sfw-the-top-n-cybersecurity-stories-of-2021-for-small-positive-integer-values-of-n/' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> SFW! The Top N Cyber­security Stories of 2021 (for small positive integer values of N) </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>December 24, 2021</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                  <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://www.itsecurityguru.org/2021/12/23/monongalia-health-system-victim-to-bec-attack/?utm_source=rss&amp;utm_medium=rss&amp;utm_campaign=monongalia-health-system-victim-to-bec-attack' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> Monongalia Health System victim to BEC attack </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>December 23, 2021</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                  <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://www.welivesecurity.com/videos/week-security-tony-anscombe-153/' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> Week in security with Tony Anscombe </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>December 23, 2021</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                  <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://www.tripwire.com/state-of-security/featured/cybersecurity-when-stress-and-trauma-get-in-the-way/' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> Cybersecurity: When Stress and Trauma ‘Get in the Way’ </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>December 27, 2021</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                  <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://www.tripwire.com/state-of-security/ics-security/fulfilling-security-requirements-for-the-transportation-sector/' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> Fulfilling Security Requirements for the Transportation Sector </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>December 23, 2021</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                  <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://securityintelligence.com/articles/ransomware-double-extortion/' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> Ransomware Attackers’ New Tactic: Double Extortion </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>December 23, 2021</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                  <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://nakedsecurity.sophos.com/2021/12/23/the-cool-retro-phone-with-a-real-dial-plus-plenty-of-iot-problems/' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> The cool retro phone with a REAL DIAL… plus plenty of IoT problems </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>December 23, 2021</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                  <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://www.intezer.com/blog/malware-analysis/the-role-of-malware-analysis-in-cybersecurity/' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> The Role of Malware Analysis in Cybersecurity </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>December 22, 2021</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                  <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://nakedsecurity.sophos.com/2021/12/22/plundered-bitcoins-recovered-by-fbi-all-3879-and-one-sixth-of-them/' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> Plundered bitcoins recovered by FBI – all 3,879-and-one-sixth of them! </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>December 22, 2021</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                  <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://www.wired.com/story/log4j-log4shell-vulnerability-spies-security-roundup' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> Buckle Up for More Log4j Madness </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>December 18, 2021</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                  <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://www.wired.com/story/meta-facebook-whatsapp-surveillance-for-hire' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> Meta Ousts 7 Surveillance-for-Hire Operations From Its Platforms </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>December 16, 2021</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                  <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://www.wired.com/story/log4j-log4shell-vulnerability-ransomware-second-wave' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> The Next Wave of Log4J Attacks Will Be Brutal </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>December 16, 2021</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                  <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://krebsonsecurity.com/2021/12/ny-man-pleads-guilty-in-20-million-sim-swap-theft/' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> NY Man Pleads Guilty in $20 Million SIM Swap Theft </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>December 16, 2021</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                  <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://www.wired.com/story/nso-group-forcedentry-pegasus-spyware-analysis' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> Google Warns That NSO Hacking Is On Par With Elite Spy Groups </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>December 15, 2021</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                  <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://krebsonsecurity.com/2021/12/microsoft-patch-tuesday-december-2021-edition/' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> Microsoft Patch Tuesday, December 2021 Edition </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>December 14, 2021</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                  <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://www.intezer.com/blog/cloud-security/log4shell-mitigation/' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> Log4Shell (Log4j RCE): Detecting Post-Exploitation Evidence is Best Chance for Mitigation </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>December 14, 2021</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                  <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://krebsonsecurity.com/2021/12/inside-irelands-public-healthcare-ransomware-scare/' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> Inside Ireland’s Public Healthcare Ransomware Scare </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>December 14, 2021</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                  <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://krebsonsecurity.com/2021/12/canada-charges-its-most-prolific-cybercriminal/' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> Canada Charges Its “Most Prolific Cybercriminal” </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>December 8, 2021</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                  <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://www.intezer.com/blog/malware-analysis/save-incident-response-time-intezer-analyze/' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> Save Incident Response Time </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>December 7, 2021</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                  <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://www.intezer.com/blog/malware-analysis/all-your-go-binaries-are-belong-to-us/' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> All Your Go Binaries are Belong to Us </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>December 2, 2021</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                  <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://www.intezer.com/blog/malware-analysis/the-state-of-malware-analysis/' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> The State of Malware Analysis </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>November 18, 2021</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                  <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://cybernews.com/editorial/its-time-to-talk-about-conversational-customer-service/' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> It’s time to talk about conversational customer service </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>September 2, 2021</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                  <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://cybernews.com/editorial/in-most-cases-paying-the-ransom-is-the-obvious-way-out-experts/' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> In most cases, paying the ransom is the obvious way out – experts </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>September 2, 2021</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                  <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://cybernews.com/security/amazon-tp-link-router-ships-with-vulnerable-firmware/' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> ‘Amazon’s Choice’ best-selling TP-Link router ships with vulnerable firmware </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>September 2, 2021</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                  <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://cybernews.com/security/why-does-the-u-s-want-white-hats-hacking-satellites/' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> Why does the U.S. want ‘white hats’ hacking satellites </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>September 1, 2021</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                  <div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
            
            <div class='card text-white bg-white border-secondary rounded h-100 zoom'>
              <a href='https://cybernews.com/crypto/the-rise-of-digital-currency-and-a-world-of-e-money/' target='_blank' class='card-link text-secondary' id='data-card-news'>
                <img src='#' id='data-card-image' loading="lazy" class='card-img-top img-fluid' alt='...'>
                <div class='card-body p-1'>
                  <p class='card-text' id='data-card-body-text'> The rise of digital currency and a world of e-money </p>
                </div>    
                <div class="card-footer bg-transparent border-0">
                  <small class="text-muted"><i class='glyphicon glyphicon-calendar'></i>September 1, 2021</small>
                </div>  
              </a>
            </div>          
            
          </div>     
                
      </div>            
    </div>      
  </body>
  
</html>
