self.__BUILD_MANIFEST = {
  "__rewrites": {
    "afterFiles": [],
    "beforeFiles": [
      {
        "source": "/www//_next/:path+",
        "destination": "/www/_next/:path+"
      }
    ],
    "fallback": []
  },
  "sortedPages": [
    "/_app",
    "/_error"
  ]
};self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB()