import re
import string
from nltk.corpus import stopwords  # pyright: ignore[reportMissingImports]
from nltk.tokenize import word_tokenize  # pyright: ignore[reportMissingImports]
from nltk.stem import WordNetLemmatizer  # pyright: ignore[reportMissingImports]

# carrega recursos uma única vez
STOP_WORDS = set(stopwords.words("portuguese"))
lemmatizer = WordNetLemmatizer()

def preprocess_text(text: str) -> str:
   #Nomaliza o texto do email

    # lowercase
    text = text.lower()

    # remove urls
    text = re.sub(r"http\S+|www\S+", "", text)

    # remove números
    text = re.sub(r"\d+", "", text)

    # remove pontuação
    text = text.translate(str.maketrans("", "", string.punctuation))

    # tokenização
    tokens = word_tokenize(text, language="portuguese")

    # remove stopwords e tokens muito curtos
    tokens = [
        lemmatizer.lemmatize(token)
        for token in tokens
        if token not in STOP_WORDS and len(token) > 2
    ]

    return " ".join(tokens)
