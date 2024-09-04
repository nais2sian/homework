import React from 'react';

import {Layout} from '../../components/Layout';

export const Home = () => {
    return (
        <Layout>
            <h1>Профиль</h1>
            <section>
                <h3>Алексей Петров</h3>
                <p><b>Возраст: </b> 19 лет</p>
                <p><b>Рост: </b> 167 см</p>
                <p><b>Вес: </b> 65 кг</p>
            </section>
        </Layout>
    )
};