import React from "react";
import {
  Menus,
  Menu,
  Section,
  Item,
  Variant,
  Label,
  ModifierGroup,
  Modifier,
} from "@wix/restaurants/components";
import { loadMenusServiceConfig } from "@wix/restaurants/services";
import { useLoaderData } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { motion } from "framer-motion";

export const MenusPage: React.FC = () => {
  const { menusServiceConfig } = useLoaderData<typeof menusRouteLoader>();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-[100rem] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-heading text-5xl md:text-7xl text-primary mb-4">
              Our Menu
            </h1>
            <p className="font-paragraph text-xl text-foreground max-w-2xl mx-auto">
              Discover our carefully crafted selection of artisan coffee, delicious meals, and delightful treats
            </p>
          </motion.div>
        </div>
      </section>

      <Menus.Root config={menusServiceConfig}>
        <div className="max-w-[100rem] mx-auto px-8 py-12">
          <div className="flex flex-col md:flex-row gap-6 mb-12">
            <Menus.LocationSelector
              allText="All Locations"
              contentClassName="relative z-50 max-h-48 min-w-[6rem] overflow-y-auto overflow-x-hidden rounded-lg border border-foreground/20 bg-white text-foreground shadow-md"
              scrollDownButtonClassName="flex cursor-default items-center justify-center py-1"
              scrollUpButtonClassName="flex cursor-default items-center justify-center py-1"
              triggerClassName="flex h-12 w-full md:w-64 items-center justify-between whitespace-nowrap rounded-lg border border-foreground/20 bg-white px-4 py-2 text-base text-foreground font-paragraph hover:border-soft-gold focus:outline-none focus:ring-2 focus:ring-soft-gold disabled:cursor-not-allowed disabled:opacity-50"
              viewportClassName="p-1"
              className=""
              optionClassName="relative flex w-full cursor-default select-none items-center rounded-md py-2 pl-3 pr-8 text-base text-foreground font-paragraph outline-none hover:bg-soft-gold/10 focus:bg-soft-gold/10 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            />
            <div className="flex-1 overflow-x-auto">
              <Menus.MenuSelector
                allText="All Menus"
                listClassName="inline-flex h-12 items-center justify-center rounded-lg bg-soft-gold/20 p-1 font-paragraph text-base text-foreground min-w-max"
                className=""
                triggerClassName="inline-flex items-center justify-center whitespace-nowrap rounded-md h-full px-6 py-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-soft-gold disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-soft-gold data-[state=active]:text-primary font-paragraph"
              />
            </div>
          </div>

          <Menus.MenusRepeater>
            <div className="mb-16">
              <Menu.Name className="text-4xl md:text-5xl text-primary mb-4 font-heading" />
              <Menu.Description className="text-lg text-foreground mb-10 font-paragraph max-w-3xl" />
              <Menu.SectionsRepeater>
                <div className="mb-12">
                  <Section.Name className="text-3xl text-primary mb-3 font-heading" />
                  <Section.Description className="text-base text-foreground mb-6 font-paragraph" />

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <Section.ItemsRepeater>
                      <div className="bg-white rounded-lg border border-foreground/10 hover:border-soft-gold hover:shadow-lg transition-all duration-300 overflow-hidden group h-full flex flex-col">
                        <div className="relative">
                          <Item.Images
                            className="w-full h-56 object-cover"
                            previousClassName="absolute left-2 top-1/2 -translate-y-1/2 bg-soft-gold/90 text-primary p-2 rounded-full hover:bg-soft-gold transition-all duration-200 opacity-100 md:opacity-0 md:group-hover:opacity-100 z-20 shadow-lg disabled:cursor-not-allowed disabled:bg-foreground/20 disabled:text-foreground/40 disabled:hover:bg-foreground/20 disabled:pointer-events-none"
                            nextClassName="absolute right-2 top-1/2 -translate-y-1/2 bg-soft-gold/90 text-primary p-2 rounded-full hover:bg-soft-gold transition-all duration-200 opacity-100 md:opacity-0 md:group-hover:opacity-100 z-20 shadow-lg disabled:cursor-not-allowed disabled:bg-foreground/20 disabled:text-foreground/40 disabled:hover:bg-foreground/20 disabled:pointer-events-none"
                            indicatorClassName="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-paragraph shadow-md z-20"
                          />
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2 flex-1">
                              <Item.Featured className="w-5 h-5 text-soft-gold flex-shrink-0" />
                              <Item.Name className="text-xl text-primary font-heading group-data-[featured=true]:text-soft-gold" />
                            </div>
                            <Item.Price className="text-lg text-soft-gold font-paragraph font-medium flex-shrink-0" />
                          </div>
                          <Item.Description className="text-base text-foreground mb-4 font-paragraph leading-relaxed" />

                          <Item.VariantsRepeater>
                            <div className="flex justify-between items-center mb-2 pb-2 border-b border-foreground/10">
                              <Variant.Name className="text-base text-foreground font-paragraph" />
                              <Variant.Price className="text-base text-soft-gold font-paragraph font-medium" />
                            </div>
                          </Item.VariantsRepeater>

                          <div className="flex flex-wrap gap-2 mb-4">
                            <Item.LabelsRepeater>
                              <span className="inline-flex items-center gap-1 bg-soft-gold/20 text-primary text-xs px-3 py-1 rounded-full font-paragraph">
                                <Label.Icon className="w-4 h-4 object-contain" />
                                <Label.Name />
                              </span>
                            </Item.LabelsRepeater>
                          </div>

                          <Item.ModifierGroupsRepeater>
                            <div className="mb-3 mt-auto">
                              <ModifierGroup.Name className="text-base text-primary font-heading mb-2" />
                              <div className="space-y-1">
                                <ModifierGroup.ModifiersRepeater>
                                  <div className="flex justify-between items-center py-1">
                                    <Modifier.Name className="text-sm text-foreground font-paragraph" />
                                    <Modifier.Price className="text-sm text-soft-gold font-paragraph" />
                                  </div>
                                </ModifierGroup.ModifiersRepeater>
                              </div>
                            </div>
                          </Item.ModifierGroupsRepeater>
                        </div>
                      </div>
                    </Section.ItemsRepeater>
                  </div>
                </div>
              </Menu.SectionsRepeater>
            </div>
          </Menus.MenusRepeater>
          <Menus.Loading />
          <Menus.Error />
        </div>
      </Menus.Root>

      <Footer />
    </div>
  );
};

export async function menusRouteLoader() {
  const [menusServiceConfig] = await Promise.all([loadMenusServiceConfig()]);

  return {
    menusServiceConfig,
  };
}
