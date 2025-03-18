let idx;

fetch('/search.json')
  .then(response => response.json())
  .then(data => {
    idx = lunr(function() {
      this.ref('id');
      this.field('title');
      this.field('content');
      data.forEach(doc => {
        this.add(doc);
      });
    });
  });

function search(query) {
  return idx.search(query).map(result => result.ref);
}

document.getElementById('search-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const query = document.getElementById('search-input').value;
  const results = search(query);
  console.log(results); // 검색 결과 출력
});