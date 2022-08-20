// import React, { Component } from "react";
// import { View, Text } from "react-native";

// class RenderDinamic extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {};
//   }
//   renderListSelecionados = () => {
//     const { data } = this.props;
//     console.log(data);
//     let dataView = [];
//     let cont = 0;
//     // for (var i = 0; i < data.megaCrew; i++) {
//     //   dataView = [...dataView, { id: cont, category: "megaCrew", email: "", text: "" }];
//     //   cont = cont + 1;
//     // }
//     // for (var i = 0; i < data.miniCrew; i++) {
//     //   dataView = [...dataView, { id: cont, category: "miniCrew", email: "", text: "" }];
//     //   cont = cont + 1;
//     // }
//     // for (var i = 0; i < data.megaCrew; i++) {
//     //   dataView = [...dataView, { id: cont, category: "junior", email: "", text: "" }];
//     //   cont = cont + 1;
//     // }
//     // for (var i = 0; i < data.megaCrew; i++) {
//     //   dataView = [...dataView, { id: cont, category: "duo", email: "", text: "" }];
//     //   cont = cont + 1;
//     // }
//     // for (var i = 0; i < data.megaCrew; i++) {
//     //   dataView = [...dataView, { id: cont, category: "solo", email: "", text: "" }];
//     //   cont = cont + 1;
//     // }
//     console.log(dataView);
//     const ListSelecionados = dataView.map((item, index) => (
//       <View>
//         <Text style={styles.textSubtitle}>{item.category}</Text>

//         <Input
//           label={"Nombre"}
//           placeholder={"Nombre"}
//           value={["category" + index]}
//           name={"category" + index}
//           onChange={onChange}
//           style={styles.inputDesing}
//           onClear={() => {
//             setName("");
//           }}
//         />
//         <Input
//           label={"Email"}
//           placeholder={"Nombre"}
//           value={"name"}
//           onChange={onChange}
//           style={styles.inputDesing}
//           onClear={() => {
//             setName("");
//           }}
//         />
//         <Text style={styles.textSubtitleGroup}>{"Siguiente grupo"}</Text>
//       </View>
//     ));

//     return ListSelecionados;
//   };

//   render() {
//     return <div>klk</div>;
//   }
// }

// export default RenderDinamic;
