/**
 * Name: Vansh
 * CMP233
 * Date: 12/17/2024
 * Purpose: this project will track the expenses of the user. The user can add the item and its price. The total price will be calculated and displayed at the bottom of the list. The user can delete the item by clicking on the 'X' button.
 */

"use client";

import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  query,
} from "firebase/firestore";
import { db } from "./firebase";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({ name: "", price: 0 }); // default item state
  const [total, setTotal] = useState(0); // default total price
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsMounted(true); // Ensures client-side only
  }, []);

  // Grab items from Firestore
  useEffect(() => {
    const q = query(collection(db, "items"));
    const data = onSnapshot(q, (querySnapshot) => {
      // Actually getting data from Firestore
      const itemsArr = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setItems(itemsArr); // sending everything to items array

      // Calculate total price
      const totalPrice = itemsArr.reduce(
        // Calculating the total price
        (sum, item) => sum + parseFloat(item.price),
        0
      );
      setTotal(totalPrice); // Setting total price

      setIsLoading(false); // Fetching is complete
    });

    return () => data();
  }, []);

  const addItem = async (e) => {
    // Adding item to the list
    e.preventDefault();
    try {
      if (
        item.name.trim() !== "" &&
        !isNaN(item.price) &&
        Number(item.price) > 0
      ) {
        // Making sure that data is valid
        await addDoc(collection(db, "items"), {
          // Will add to FireStone database
          name: item.name,
          price: parseFloat(item.price),
        });
        setItem({ name: "", price: "" }); // Resetting the input fields
      } else {
        alert("Invalid input");
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const deleteItem = async (id) => {
    // Deleting items from the firestore database
    await deleteDoc(doc(db, "items", id));
  };

  const renderItems = () =>
    // Rendering the items on the site
    items.map((item) => (
      <li
        key={item.id}
        className="my-4 w-full flex justify-between bg-slate-950"
      >
        <div className="flex w-full justify-between p-4">
          <span className="capitalize">{item.name}</span>{" "}
          {/* Capitalizing the first letter of the item */}
          <span>${item.price}</span>
        </div>
        <button
          onClick={() => deleteItem(item.id)} // Button for Deleting the item
          className="ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16"
        >
          X
        </button>
      </li>
    ));

  if (!isMounted || isLoading) return <div>Loading...</div>;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-center sm:text-left">
          {" "}
          {/* Title of the site */}
          Expense Tracker
        </h1>
        <div className="bg-slate-800 p-4 rounded-lg">
          <form className="grid grid-cols-6 items-center text-black">
            <input
              value={item.name}
              onChange={(e) => setItem({ ...item, name: e.target.value })}
              className="col-span-3 p-3 border"
              type="text"
              placeholder="Enter Item"
            />{" "}
            {/*Input for item */}
            <input
              value={item.price}
              onChange={(e) => setItem({ ...item, price: e.target.value })}
              className="col-span-2 p-3 border mx-3"
              type="number"
              min="0"
              placeholder="Enter Cost"
            />{" "}
            {/*Input for cost */}
            <button
              onClick={addItem}
              className="text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl"
              type="submit"
            >
              Add
            </button>{" "}
            {/*Button for adding */}
          </form>
          <ul>{renderItems()}</ul> {/*Rendering the items */}
          {items.length > 0 && (
            <div className="flex justify-between p-3">
              <span>Total</span>
              <span>${total}</span>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
