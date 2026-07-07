const Chatbot = {
 

  additionalResponses: {},

  unsuccessfulResponse: `Sorry, I didn't quite understand that. Currently, I only know how to flip a coin, roll a dice, or get today's date, uia, eat. Let me know how I can help!`,

  emptyMessageResponse: `Sorry, it looks like your message is empty. Please make sure you send a message and I will give you a response.`,

  addResponses: function (additionalResponses) {
    this.additionalResponses = {
      ...this.additionalResponses,
      ...additionalResponses,
    };
  },

  getResponse: function (message) {
    if (!message) {
      return this.emptyMessageResponse;
    }

    const normalizedMessage = message.toLowerCase().trim();

    const responses = {
      ...this.defaultResponses,
      ...this.additionalResponses,
    };

    const originalKeys = Object.keys(responses);
    const lowerKeys = originalKeys.map((k) => k.toLowerCase());

    const { ratings, bestMatchIndex } = this.stringSimilarity(
      normalizedMessage,
      lowerKeys,
    );

    if (
      bestMatchIndex === -1 ||
      !ratings ||
      !ratings[bestMatchIndex] ||
      ratings[bestMatchIndex].rating <= 0.3
    ) {
      return this.unsuccessfulResponse;
    }

    const bestResponseKey = originalKeys[bestMatchIndex];
    const response = responses[bestResponseKey];

    return typeof response === "function" ? response() : response;
  },
  getResponseAsync: function (message) {
    return new Promise((resolve) => {
      // Pretend it takes some time for the chatbot to response.
      setTimeout(async () => {
        const response = this.getResponse(message);

        if (response === this.unsuccessfulResponse) {
          const aiReply = await askAI(message);
          resolve(aiReply);
        } else {
          resolve(response);
        }
      }, 1000);
    });
  },

  compareTwoStrings: function (first, second) {
    first = first.replace(/\s+/g, "");
    second = second.replace(/\s+/g, "");

    if (first === second) return 1;
    if (first.length < 2 || second.length < 2) return 0;

    let firstBigrams = new Map();
    for (let i = 0; i < first.length - 1; i++) {
      const bigram = first.substring(i, i + 2);
      const count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) + 1 : 1;

      firstBigrams.set(bigram, count);
    }

    let intersectionSize = 0;
    for (let i = 0; i < second.length - 1; i++) {
      const bigram = second.substring(i, i + 2);
      const count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) : 0;

      if (count > 0) {
        firstBigrams.set(bigram, count - 1);
        intersectionSize++;
      }
    }

    return (2.0 * intersectionSize) / (first.length + second.length - 2);
  },

  stringSimilarity: function (mainString, targetStrings) {
    const ratings = [];
    let bestMatchIndex = 0;

    for (let i = 0; i < targetStrings.length; i++) {
      const currentTargetString = targetStrings[i];
      const currentRating = this.compareTwoStrings(
        mainString,
        currentTargetString,
      );
      ratings.push({ target: currentTargetString, rating: currentRating });
      if (currentRating > ratings[bestMatchIndex].rating) {
        bestMatchIndex = i;
      }
    }

    const bestMatch = ratings[bestMatchIndex];

    return {
      ratings: ratings,
      bestMatch: bestMatch,
      bestMatchIndex: bestMatchIndex,
    };
  },
};
export default Chatbot;

const sessionId = localStorage.getItem("sessionId") || crypto.randomUUID();
localStorage.setItem("sessionId", sessionId);

async function askAI(message) {
  const response = await fetch("http://localhost:3001/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, sessionId }),
  });

  const data = await response.json();
  return data.reply;
}
