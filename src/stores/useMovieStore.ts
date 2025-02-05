import { defineStore } from "pinia";
import { ref, type Ref, computed } from "vue";

import type { Movie } from "../types/movie";

export const useMovieStore = defineStore("movieStore", () => {
  const movies: Ref<Movie[]> = ref([
    {
      id: 1,
      title: "Harry Potter and the Philosopher's Stone",
      duration: "152 min",
      rating: 7.6,
      genre: "Fantasy",
      imageUrl: "/dummies/movie-dummy-1.jpg",
      description:
        "Harry Potter, an orphaned boy, discovers that he is a wizard on his 11th birthday and is invited to attend the prestigious Hogwarts School of Witchcraft and Wizardry. As he navigates his new world of spells, magical creatures, and enchanted objects, he uncovers a dark secret about his past and his connection to the evil wizard Voldemort, who seeks to return to power. Alongside his friends Ron and Hermione, Harry embarks on an adventure that will define his destiny.",
    },
    {
      id: 2,
      title: "Inception",
      duration: "148 min",
      rating: 8.8,
      genre: "Sci-Fi",
      imageUrl: "/dummies/movie-dummy-2.jpg",
      description:
        "Dom Cobb is a skilled thief with the rare ability to enter people's dreams and steal their deepest secrets. When he is offered a seemingly impossible job — to plant an idea into someone's mind rather than extract it — he sees it as his only chance for redemption. As he assembles a team of dream architects, their mission takes them through layers of subconscious realities, where the line between dreams and reality begins to blur, leading to a breathtaking and mind-bending journey.",
    },
    {
      id: 3,
      title: "Titanic",
      duration: "195 min",
      rating: 7.8,
      genre: "Romance",
      imageUrl: "/dummies/movie-dummy-3.jpg",
      description:
        "A grand love story set aboard the doomed RMS Titanic, Titanic follows the passionate romance between Jack, a free-spirited artist, and Rose, a young aristocrat trapped in a life she despises. As their love blossoms despite societal boundaries, disaster strikes when the 'unsinkable' ship collides with an iceberg. Amidst the chaos and tragedy, Jack and Rose fight for survival in one of the most harrowing maritime disasters in history.",
    },
    {
      id: 4,
      title: "The Dark Knight",
      duration: "152 min",
      rating: 9.0,
      genre: "Action",
      imageUrl: "/dummies/movie-dummy-4.jpg",
      description:
        "In Gotham City, Batman faces his most formidable adversary yet: the Joker, a psychotic criminal mastermind who thrives on chaos. As the Joker launches a wave of destruction, Batman, District Attorney Harvey Dent, and Commissioner Gordon must work together to stop him. But as the battle intensifies, Batman is forced to make morally challenging decisions, questioning his role as Gotham's protector and how far he is willing to go to defeat an enemy who believes in nothing but anarchy.",
    },
    {
      id: 5,
      title: "Interstellar",
      duration: "169 min",
      rating: 8.6,
      genre: "Sci-Fi",
      imageUrl: "/dummies/movie-dummy-5.jpeg",
      description:
        "As Earth faces a global environmental crisis, former NASA pilot Cooper is called upon to embark on a daring mission through a newly discovered wormhole in search of a habitable planet for humanity. Alongside a team of scientists, he must navigate the perils of deep space, time dilation, and emotional sacrifices as he races against time. Interstellar is an epic journey through the vast cosmos, exploring the power of love, sacrifice, and the unbreakable bond between a father and his daughter.",
    },
  ]);

  const genres = computed(() => [
    "All",
    ...new Set(movies.value.map((movie) => movie.genre)),
  ]);
  const selectedGenre = ref<string>("All");

  const setGenre = (genre: string) => {
    selectedGenre.value = genre;
  };

  const filteredMovies = computed(() => {
    return selectedGenre.value === "All"
      ? movies.value
      : movies.value.filter((movie) => movie.genre === selectedGenre.value);
  });
  
  const getMovieById = (id : number) => {
    return movies.value.find(m => m.id === id);
  }; 

  return { movies, genres, selectedGenre, setGenre, filteredMovies, getMovieById };
});
