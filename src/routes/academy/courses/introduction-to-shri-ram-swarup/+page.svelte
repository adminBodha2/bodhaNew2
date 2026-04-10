<script lang="ts">

	import Container from '$lib/comps/container.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import { metaTitle, metaDescription, metaUrl, metaImage } from '$lib/utils/metastores';
  import Calendar from '$lib/icons/calendar.svelte'
  import Rupee from '$lib/icons/rupee.svelte'
  import Sessions from '$lib/icons/sessions.svelte'
  import Time from '$lib/icons/time.svelte'

  $metaTitle = 'Introduction to Shri Ram Swarup - Bodha Courses'
  $metaDescription = 'Online course on the works and thoughts of Shri Ram Swarup.'
  $metaUrl = 'https://www.bodharesearch.in/academy/courses/introduction-to-shri-ram-swarup'
  $metaImage = '/images/intro-to-srs.webp'

  let isItem = Array(5).fill(false)
  isItem[0] = true

  function toggleItem(index:number){
		isItem[index] = !isItem[index];
		for (let i = 0; i < isItem.length; i++) {
			if (i !== index && isItem[i] === true) {
				isItem[i] = false;
			}
		}
  }

</script>

<Head title={$metaTitle} metaDescription={$metaDescription} metaUrl={$metaUrl} metaImage={$metaImage}></Head>

<Container>
  <div class="column rgap32 top-pad">
    <div class="grid two rgap32">
      <div class="column rgap16 ycenter thisdown">
        <div class="label"><small class="tt-u">Bodha Courses</small></div>
        <h1 class="blogtitle">Introduction to Shri Ram Swarup</h1>
        <p class="width80 pbot16">Shri Ram Swarup was one of the greatest Hindu thinkers to come out of India in the last century. This course is an introduction to his works and thoughts, leading learners to a better understanding of Bharatavarsha, Sanatana Dharma, and our place in the scheme of things.</p>
        <div class="row cgap32 bordertop borderbot ptop16 pbot16">
          <div class="column xcenter rgap8 ta-c">
            <Calendar/>
            <small class="tt-u"><b>21-24 Mar<br>& 1-4 Apr</b></small>
          </div>
          <div class="column xcenter rgap8">
            <Sessions/>
            <small class="tt-u"><b>8 sessions</b></small>
          </div>
          <div class="column xcenter rgap8">
            <Time/>
            <small class="tt-u"><b>7-8pm</b></small>
          </div>
          <div class="column xcenter rgap8">
            <Rupee/>
            <small class="tt-u"><b>₹ 2499/-</b></small>
          </div>
        </div>
<!--
        <div class="row cgap16 ptop16">
          <div class="column ta-c xcenter">
            <form><script src="https://checkout.razorpay.com/v1/payment-button.js" data-payment_button_id="pl_SE3qnYjftIBoiY" async></script></form>
            <small><b>Indian Registrations</b></small>
          </div>
          <div class="column ta-c xcenter">
            <form><script src="https://checkout.razorpay.com/v1/payment-button.js" data-payment_button_id="pl_SEKf9pbYWHFIQH" async> </script> </form>
            <small><b>International Registrations</b></small>
          </div>
        </div>
-->
      </div>
      <div class="column thisup">
        <img class="key" src="/images/srg-square.webp" alt="introduction to shri ram swarup"/>
      </div>
    </div>
  </div>
  <div class="box50 column rgap32 pbot64 bordertop ptop32">
    <div class="row ofitems cgap16 mwrap rgap16">
      <button class="buttonheading" class:selected={isItem[0]} on:click={() => toggleItem(0)}>Overview</button>
      <button class="buttonheading" class:selected={isItem[1]} on:click={() => toggleItem(1)}>Audience</button>
      <button class="buttonheading" class:selected={isItem[2]} on:click={() => toggleItem(2)}>Takeaways</button>
      <button class="buttonheading" class:selected={isItem[3]} on:click={() => toggleItem(3)}>Facilitator</button>
      <button class="buttonheading" class:selected={isItem[4]} on:click={() => toggleItem(4)}>Sessions</button>
    </div>
    <div class="column itemsarea">
      {#if isItem[0]}
        <div class="column rgap16 width80">
          <h6 class="thin">Shri Ram Swarup was one of the finest thinkers of Bharatavarsha, who commented upon every important aspect of Hindu culture; and upon the nature of Bharata’s civilizational enemies, with penetrative insights. He did a purva paksha of ideologies like Islam, Christianity, Judaism and Communism, through an exposition of yogic chitta bhumis.</h6>
          <h6 class="thin">He explained yoga sadhana and its centrality to Hindu Dharma, drawing from deep meditational experiences. He explained Hindu darshana and nuances of language, words, and roots by discussing names of gods. He dreamed of re-establishing Sanatana Dharma as a universal tradition, while helping pagan sects to revive. Never wasting a single word, his writing is un-editable like a sutra, and yet exudes great literary beauty.</h6>
          <h6 class="thin">Shri Ram Swarup was a deep civilizational thinker – spiritually, intellectually, and culturally. Every aspiring thinker and leader should heed his call for Hindu renaissance, and his concepts of Svayambodha and Shatrubodha. This course is an introduction to the work of Shri Ram Swarup, discussing all his works in eight lectures, leading the learners to a better understanding of Bharatavarsha and the world.</h6>
        </div>
      {:else if isItem[1]}
        <div class="column rgap16 width80">
          <h5>Who is the Course For?</h5>
          <div class="column bordertop ptop16 rgap8">
            <h6>Thinkers</h6>
            <h6 class="thin">Thinkers who want to develop a deep understanding of Sanatana Dharma and Hindu cosmology will immensely benefit from the deep insights that Shri Ram Swarup has about our tradition. Those who want to understand the civilizational struggles of Bharatavarsha and Hindu Dharma vis-à-vis monotheistic colonialisms will also benefit from the course.</h6>
          </div>
          <div class="column bordertop ptop16 rgap8">
            <h6>Activists</h6>
            <h6 class="thin">Cultural activists and civilizational nationalists who are determined to protect the ideological, as well as geographical integrity of Bharatavarsha, will gain great perspective and insights about what to do about the problems that the Hindu society faces. Those who want a global network of dharmic sects will also gain various insights through this course.</h6>
          </div>
          <div class="column bordertop ptop16 rgap8">
            <h6>Scholars</h6>
            <h6 class="thin">Scholars studying comparative religion, cultural anthropology, sociology, philosophy and political science will immensely benefit from the comprehension of Hindu Dharma and society based on the works of Shri Ram Swarup. His works have many potential ideas and departure points of great projects which scholars can take forward.</h6>
          </div>
          <div class="column bordertop ptop16 rgap8">
            <h6>Students</h6>
            <h6 class="thin">India’s textbooks do not do justice to the history, culture and civilization of Bharatavarsha. Shri Ram Swarup wrote in order to correct this fault in our historiography. He does not just tell us the true history of our country and Dharma, he gives us the points of view from which to see the world and change it for the better. That is why students will benefit immensely from the course.</h6>
          </div>
        </div>
      {:else if isItem[2]}
        <div class="column rgap16 width80">
          <div class="column bordertop ptop16 rgap8">
            <h6>Developing Svayambodha</h6>
            <h6 class="thin">Who are we? Every society has to ask this question every time we lose sight of our identity, origin and roots. What does being Hindu mean? What are the universal principles of Hindu Dharma? What are the core ideas of Bharatiya culture and civilization? Shri Ram Swarup has answered all these questions about the fundamental identity of Hindu culture and people. This course will attempt to develop this profound sense of svayambodha, who we are, through the works of Shri Ram Swarup.</h6>
          </div> 
          <div class="column bordertop ptop16 rgap8">
            <h6>Developing Shatrubodha</h6>
            <h6 class="thin">India is locked in a civilizational struggle with two colonialisms: European Christian colonialism and Middle Eastern colonialism. It is necessary to understand the theological, institutional and religious inspiration behind them. It is necessary to understand the nature of prophetic monotheistic religions like Islam, Christianity and Judaism and how they are different from yogic traditions like Hindu Dharma, Buddhism, Jainism etc. This course will attempt to do it through the works of Shri Ram Swarup.</h6>
          </div> 
          <div class="column bordertop ptop16 rgap8">
            <h6>Developing Respect for Tradition</h6>
            <h6 class="thin">Dharma makes itself manifest through traditions, customs and rituals. That is why, ever since the Vedas were written in Bharatavarsha, rituals have a central importance in Sanatana Dharma. But how do these rituals work? How do mantras operate? How do they connect the human to the divine? Shri Ram Swarup has explained how the Hindu cosmos virtually works and during this while he has explained the deepest of life’s mysteries. This course will develop a deep understanding of the dharmic tradition and will consequently generate respect for the same.</h6>
          </div> 
          <div class="column bordertop ptop16 rgap8">
            <h6>Developing a Plan for Pagan Revival</h6>
            <h6 class="thin">One of the greatest dreams of Shri Ram Swarup was to revive the pagan, polytheistic traditions all over the world. And it was his firm belief that Sanatana Dharma, being a great living tradition, is capable of providing a cultural umbrella under which diverse non-monotheistic, non-Abrahamic traditions of the world can unite and also take guidance from. He considered it absolutely necessary for posing a united front against monotheistic colonialisms. This course will advance this path by making you understand the need and plan for the same.</h6>
          </div>        
        </div>
      {:else if isItem[3]}
        <div class="column rgap16 width80">
          <img class="phot" src="/images/team/PS.webp" alt="pankaj saxena"/>
          <h6 class="thin"><b>Pankaj Saxena</b> is a founder of Bodha and an author on Hindu temples, aesthetics, arts, literature, history and culture. But he also calls himself a Voice of India graduate. Early in life, by the grace of his guru, he encountered the works of Shri Ram Swarup, published by Voice of India. And that started him on a journey of civilizational immersion. Through the works of Shri Ram Swarup, he realized the importance of Sanatana Dharma in the greater scheme of things. It made him look at the world through a deeply Sanatana/ Hindu point of view. Ever since then he tries to spread the world of Shri Ram Swarup; particularly focusing on his deep spiritual anchor, the yogic vision behind this worldview, and his call for a pagan revival and unity, presided and guided by a living ancient, pagan civilization like Bharatavarsha. Pankaj is a witness to the awakening of a generation through the works of Shri Ram Swarup and Shri Sita Ram Goel. With this course, he seeks to take their vision further.</h6>
        </div>
      {:else if isItem[4]}
        <div class="grid four cgap24 rgap24">
          <div class="column rgap8">
            <p class="tight bold blue">Session 1 - Inverting the Gaze: A Hindu View of the World</p>
            <p class="tight">Studying the purva paksha of the two religions in his books like ‘Hindu View of Christianity and Islam’ and ‘Hinduism and Monotheistic religions’.</p>
            <p class="sm italic grey">Books Consulted: Hindu View of Christianity and Islam, Hinduism and Monotheistic Religions</p>
          </div>
          <div class="column rgap8">
            <p class="tight bold blue">Session 2 - The Mind of the Other: A Critique of Islam</p>
            <p class="tight">Understanding the true nature of Islam and Prophetic Monotheism, and how the Muslim mind works. This chapter will also deal with the issue of women in Islam.</p>
            <p class="sm italic grey">Books Consulted: Understanding Islam through Hadis, Woman in Islam, Hinduism and the Monotheistic Religions</p>
          </div>
          <div class="column rgap8">
            <p class="tight bold blue">Session 3 - The Missionary Threat to India: A Critique of Christianity</p>
            <p class="tight">Studying the evangelist and missionary nature of Christianity, and why it is fundamentally dangerous for Bharatavarsha and Sanatana Dharma.</p>
            <p class="sm italic grey">Books Consulted: Hinduism and the Monotheistic Religions, Hindu View of Christianity and Islam, Christianity an Imperialist Ideology</p>
          </div>
          <div class="column rgap8">
            <p class="tight bold blue">Session 4 - Theory and Practice of Communism: A Critique of Communism</p>
            <p class="tight">Delving deep into the early works of Ram Swarup in which he analyzes the nature of communism and how it can disturb Indian society and culture by weakening it from within.</p>
            <p class="sm italic grey">Books Consulted: Gandhism and Communism, Foundations of Maoism, Communists after Communism, Red Star over Bengal</p>
          </div>
          <div class="column rgap8">
            <p class="tight bold blue">Session 5 - Hindu View of Buddhism and Sikhism</p>
            <p class="tight">Analyzing similarities, problems and conflicts between the two dharmic sects of Hinduism and Buddhism on one hand, and between Hinduism and Sikhism on the other.</p>
            <p class="sm italic grey">Books Consulted: Hindu-Buddhist Rejoinder to Pope John-Paul II on Eastern Religions and Yoga, Buddhism vis-a-vis Hinduism, Hinduism and Monotheistic Religions, Hindu-Sikh Relationship, Meditations: Yogas, Gods, Religions, Whither Sikhism?</p>
          </div>
          <div class="column rgap8">
            <p class="tight bold blue">Session 6 - On Hinduism: Looking upon Ourselves</p>
            <p class="tight">Studying our own tradition, religion and culture through the most universal of concepts and practices and reflecting upon the reasons of the cultural self-alienation in Hindus.</p>
            <p class="sm italic grey">Books Consulted: On Hinduism: Reviews & Reflections</p>
          </div>
          <div class="column rgap8">
            <p class="tight bold blue">Session 7 - Meditations: A Sadhaka’s View of the World</p>
            <p class="tight">Gazing inwards into the greatest yogic tradition of the world, analyzing Patanjali Yoga and its importance in our lives along with analyzing the nature of gods.</p>
            <p class="sm italic grey">Books Consulted: Meditations: Yogas, Gods, Religions</p>
          </div>
          <div class="column rgap8">
            <p class="tight bold blue">Session 8 - Sanatana Dharma and Pagan Religions of the World</p>
            <p class="tight">Delving deep into the nature of language; analyzing the connection between speech sounds and consciousness; and finally understanding the mystery of the names of gods.</p>
            <p class="sm italic grey">Books Consulted: The Word as Revelation: Names of Gods</p>
          </div>
        </div>
      {/if}
    </div>
  </div>
</Container>

<style lang="sass">

img.key
  object-fit: cover
  width: 100%

.top-pad
  .grid.two
    height: 100%
    @media screen and (max-width: 1024px)
      grid-template-areas: "thisup" "thisdown"
      .thisup
        grid-area: thisup
      .thisdown
        grid-area: thisdown

.thisdown
  @media screen and (min-width: 1025px)
    padding-right: 16px

img.phot
  border-radius: 50%
  @media screen and (min-width: 1025px)
    height: 144px
    width: 144px
  @media screen and (max-width: 1024px)
    height: 144px
    width: 144px

</style>