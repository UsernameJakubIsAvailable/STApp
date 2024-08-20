const fetchTabs = () => {
  fetch("http://sttest.local/wp-json/wp/v2/pages?&_fields=slug,id,parent")
    .then((res) => res.json())
    .then((data) => {
      const fetchetData = data;

      const mainBranch = data.filter((data) => !data.parent);

      const createBranchs = (parent) => {
        parent.forEach((item, index) => {
          const childrens = data.filter((data) => item.id == data.parent);
          if (childrens.length > 0) {
            parent[index].childrens = childrens;
          }
          createBranchs(childrens);
        });
      };
      createBranchs(mainBranch);
      console.log(mainBranch);
      return mainBranch;
    });
};

export default fetchTabs;
