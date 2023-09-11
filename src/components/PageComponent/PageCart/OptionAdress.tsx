import { ChangeEvent, useCallback, useEffect, useState } from "react";

import axios from "axios";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";

import { AdressSlideState, setAdressHandle } from "@/redux/userSlice";


interface City {
    Id: string;
    Name: string;
    Districts: District[];
}

interface District {
    Id: string;
    Name: string;
    Wards: Ward[];
}

interface Ward {
    Id: string;
    Name: string;
}

interface SetSelectedOptionProps {
    city: null | { value: string, label: string }
    district: null | { value: string, label: string };
    ward: null | { value: string, label: string };
}

const OptionAdress = () => {

    const dispatch = useDispatch();
    const { adressUser } : { adressUser: AdressSlideState }  = useSelector(
        (state: any) => state.user
    );
    
    const [cities, setCities] = useState<City[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get<City[]>(
                    "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
                );
                setCities(response.data);
                if(adressUser.city) {
                    const selectedCityData = response.data.find((city) => city.Id === adressUser.city?.value);
                    if(selectedCityData) {
                        setDistricts(selectedCityData.Districts);
                        if(adressUser.district) {
                            const selectedDistrictData = selectedCityData.Districts.find((district) => district.Id === adressUser.district?.value);
                            if(selectedDistrictData) {
                                setWards(selectedDistrictData.Wards);
                            }
                        }
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, []);

    const handleChangeOption = (name: "city" | "district" | "ward", selected: { value: string, label: string } | null) => {
        if(selected) {
            if(name === "city") {
                const selectedCityData = cities.find((city) => city.Id === selected.value);
                if (selectedCityData) {
                    // setSelectedOption({
                    //     ...selectedOption,
                    //     city: selected,
                    //     district: null,
                    //     ward: null
                    // })
                    dispatch(setAdressHandle({
                        city: selected,
                        district: null,
                        ward: null
                    }))
                    setDistricts(selectedCityData.Districts);
                    setWards([]);
                }
            }
            else if(name === "district") {
                const selectedDistrictData = districts.find((district) => district.Id === selected.value);
                if (selectedDistrictData) {
                    // setSelectedOption({
                    //     ...selectedOption,
                    //     district: selected,
                    //     ward: null
                    // })
                    dispatch(setAdressHandle({
                        district: selected,
                        ward: null
                    }))
                    setWards(selectedDistrictData.Wards);
                }
            }
            else if(name === "ward") {
                // setSelectedOption({
                //     ...selectedOption,
                //     ward: selected
                // })
                dispatch(setAdressHandle({
                    ward: selected
                }))
            }
        }
        // ----
        else {
            if(name === "city") {
                // setSelectedOption({
                //     ...selectedOption,
                //     city: null,
                //     district: null,
                //     ward: null
                // })
                dispatch(setAdressHandle({
                    city: null,
                    district: null,
                    ward: null
                }))
            }
            else if(name === "district") {
                // setSelectedOption({
                //     ...selectedOption,
                //     district: null,
                //     ward: null
                // })
                dispatch(setAdressHandle({
                    district: null,
                    ward: null
                }))
            }
            else if(name === "ward") {
                // setSelectedOption({
                //     ...selectedOption,
                //     ward: null
                // })
                dispatch(setAdressHandle({
                    ward: null
                }))
            }
        }
    }

    return (
        <div>
            <SelectComponent
                selectType="city"
                handleOnChange={handleChangeOption}
                options={cities}
                placeholder="Tỉnh"
                selected={adressUser.city}
            />
            <SelectComponent
                selectType="district"
                handleOnChange={handleChangeOption}
                options={districts}
                placeholder="Quận/Huyện"
                selected={adressUser.district}
            />
            <SelectComponent
                selectType="ward"
                handleOnChange={handleChangeOption}
                options={wards}
                placeholder="Xã"
                selected={adressUser.ward}
            />
        </div>
    );
};

export default OptionAdress;

const SelectComponent: React.FC<{
    selectType: "city" | "district" | "ward";
    options: City[] | District[] | Ward[];
    selected: { value: string; label: string } | null;
    placeholder: string;
    handleOnChange: (selectType: "city" | "district" | "ward", selected: { value: string, label: string } | null) => void;
}> = ({ selectType, options, selected, placeholder, handleOnChange }) => (
    <Select
        className="mb-4 basic-single"
        classNamePrefix="select"
        defaultValue={null}
        placeholder={placeholder}
        isClearable={true}
        isSearchable={true}
        name="color"
        value={selected}
        onChange={(selected) => handleOnChange(selectType, selected)}
        options={options.map((option) => {
            return {
                value: option.Id,
                label: option.Name,
            };
        })}
    />
);
