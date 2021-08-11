import AsyncStorage from '@react-native-async-storage/async-storage';
import * as axios from 'react-native-axios';
import { Button, Container, FormControl , Icon, Input, Stack, Select, Text, TextArea, Toast, NativeBaseProvider } from "native-base";
import React from "react";
import { Image, ToastAndroid, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ImagePicker from 'react-native-image-crop-picker';
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid';


export default class Product extends React.Component {

    constructor(props) {
        super(props);
        // AsyncStorage.clear();
        this.addProduct = this.addProduct.bind(this)
        this.state = {
            p_id:0,
            productName: '',
            userId: '',
            desc: '',
            price: '',
            categoriesSelectData: [],
            unitSelectData: [],
            selectedCategory: '',
            selectedCity: '',
            selectedUnit: '',
            featureImage: '',
            pictures: []
        }
    }

    async componentDidMount() {

        var productDetails = this.props.route.params?.productDetails
        this.setState({
            categoriesSelectData: await this.getCategoriesData(),
            unitSelectData: await this.getUnitData()
        })

        if (productDetails != undefined) {
            this.setState({
                p_id: productDetails.id,
                productName: productDetails.name,
                price: productDetails.price,
                desc: productDetails.desc,
                selectedCategory: parseInt(productDetails.cat_id),
                featureImage: `http://brandsmen.com.pk/rent_api/public/${productDetails.feature_image}`,
                selectedUnit: productDetails.unit,
            })

        }

        
    }


    async getCategoriesData() {
        let response = await axios.get('http://brandsmen.com.pk/rent_api/public/api/all_cat')
        return response.data;
    }

    async getUnitData() {
        let response = await axios.get('http://brandsmen.com.pk/rent_api/public/api/all_cities')
        return response.data;
    }

    async addProduct() {


        if (this.state.featureImage != "" && this.state.productName != "" && this.state.price != "") {

            console.log("+++++++++++++++++++++++++++++");

        console.log(this.state.p_id);

        console.log("-----------------------------------");

            const userId = await AsyncStorage.getItem("user_id")
            const uuid = uuidv4();
            const formData = new FormData();
            const galleryFormData = new FormData();

            formData.append('feature_image', { uri: this.state.featureImage, name: 'test.jpg', type: 'image/*' })
            formData.append('name', this.state.productName)
            formData.append('ids', this.state.p_id)
            formData.append('user_id', userId)
            formData.append('cat_id', this.state.selectedCategory)
            formData.append('desc', this.state.desc)
            formData.append('price', this.state.price)
            formData.append('unit', this.state.selectedUnit)
            formData.append('token', uuid)
            formData.append('id', )

            this.state.pictures.map((item, index) => galleryFormData.append(`file${index + 1}`,
                    { uri: item.path, name: `file${index + 1}.jpg`, type: 'image/*' }))
            galleryFormData.append('token', uuid)

            // const product = {
            //     name: this.state.productName,
            //     user_id: userId,
            //     cat_id: this.state.selectedCategory,
            //     desc: this.state.desc,
            //     feature_image: formData,
            //     price: this.state.price,
            //     unit: this.state.selectedUnit,
            //     gallery: '',
            // }

            // console.log(formData)

            axios.post('http://brandsmen.com.pk/rent_api/public/api/update_product',
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            ).then((response) => {

                console.log(response);

                // this.props.navigation.navigate("Homes");

            //     // try {
                    
            //     //     axios.post('http://brandsmen.com.pk/rent_api/public/api/add_gallery', galleryFormData).then(function (g_res) {
            //     //         console.log(g_res);
            //     //     });
            //     // } catch (error) {
            //     //     console.log("error");

            //     //     console.log(error)
            //     // }




            });


            // ToastAndroid.show(response.data.success, ToastAndroid.LONG)
            // this.setState({
            //     productName: '',
            //     price: '',
            //     desc: '',
            //     featureImage: '',
            //     selectedCity: '0',
            //     selectedUnit: '0',
            //     selectedCategory: '0',
            //     pictures: []
            // })
        }
        else {
            ToastAndroid.show('Please enter mandatory fields', ToastAndroid.LONG)
        }

    }


    render() {
        
        return (
            <NativeBaseProvider>

                <ScrollView style={{ flex: 1, }}>
                    <Container style={{ padding: 10 }}>

                        <FormControl>
                            <Stack space={5}>
                                <Stack>
                                    <FormControl.Label>Name</FormControl.Label>
                                    <Input  backgroundColor='white' variant="underlined" p={2} onChangeText={(text) => { this.setState({ productName: text }) }}
                                value={this.state.productName} />
                                </Stack>
                                <Stack>
                                    <FormControl.Label>Price</FormControl.Label>
                                    <Input backgroundColor='white' p={2} onChangeText={(text) => { this.setState({ price: text }) }} value={this.state.price} />
                                </Stack>
                                <Stack>
                                    <FormControl.Label>Price</FormControl.Label>
                                    <Select
                                        mode="dropdown"
                                        iosHeader="Select category"
                                        selectedValue={this.state.selectedCategory}
                                        onValueChange={(itemValue, itemIndex) => { this.setState({ selectedCategory: itemValue }) }}
                                    >
                                        <Select.Item label="Select Category" value="0"></Select.Item>
                                        {this.state.categoriesSelectData.map(item => <Select.Item label={item.name} value={item.id}></Select.Item>)}
                                    </Select> 
                                </Stack>
                                <Stack>
                                    <FormControl.Label>Unit</FormControl.Label>
                                    <Select
                                        mode="dropdown"
                                        iosHeader="Select category"
                                        selectedValue={this.state.selectedUnit}
                                        onValueChange={(itemValue, itemIndex) => { this.setState({ selectedUnit: itemValue }) }}
                                    >
                                        <Select.Item label="Select Unit" value="0"></Select.Item>
                                        <Select.Item label={"Days"} value={"days"}></Select.Item>
                                        <Select.Item label={"Hours"} value={"hours"}></Select.Item>
                                    </Select> 
                                </Stack>
                                <Stack>
                                    <FormControl.Label>Description</FormControl.Label>
                                    <TextArea placeholder="Enter Description" onChangeText={(text) => { this.setState({ desc: text }) }} value={this.state.desc} />
                                </Stack>

                                <Stack>
                                    <Button onPress={() => {
                                        ImagePicker.openPicker({
                                            width: 300,
                                            height: 400,
                                            cropping: false
                                        }).then(image => {
                                            this.setState({ featureImage: image.path })
                                            console.log(image);
                                        });
                                    }} transparent light style={{ marginTop: 10, }}>
                                        <Text>Add Feature Image</Text>
                                        <Icon name='add' />
                                    </Button>

                                    {this.state.featureImage != '' &&
                                        <Image
                                            source={{ uri: this.state.featureImage }}
                                            style={{ width: 60, height: 60, alignSelf: 'center' }}
                                        />
                                    }

                                    <Button onPress={() => {
                                        ImagePicker.openPicker({
                                            width: 300,
                                            height: 400,
                                            cropping: false,
                                            multiple: true,
                                        }).then(image => {
                                            this.setState({ pictures: image })
                                            console.log(image);
                                        });
                                    }}
                                        transparent
                                        light
                                        style={{ marginTop: 10, }}>
                                        <Text>Add Pictures</Text>
                                        <Icon name='add' />

                                    </Button>

                                    <View style={{ flexDirection: 'row', }}>
                                        {
                                            this.state.pictures.length > 0 &&
                                            this.state.pictures.map(item =>
                                                <Image source={{ uri: item.path }}
                                                    style={{ width: 60, height: 60, marginStart: 10, }}
                                                />
                                            )
                                        }
                                    </View>

                                    <Button onPress={this.addProduct} block style={{ marginTop: 10, }}>
                                        <Text>Submit</Text>
                                    </Button>

                                </Stack>
                                
                            </Stack>
                        </FormControl>

                    </Container>
                </ScrollView>

            </NativeBaseProvider>

        );
    }

}