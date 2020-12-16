const sayHi = document.getElementById('sayHi');
sayHi.addEventListener('click', () => {
  console.log('hi');
});

const btn_topic = document.getElementById('btn-topic');
btn_topic.addEventListener('click', () => {
  const topic = document.getElementById('topic') as HTMLInputElement;
  const topicVal = topic.value;
  console.log(topicVal);
});
