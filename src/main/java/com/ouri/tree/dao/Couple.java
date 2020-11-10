package com.ouri.tree.dao;

import java.sql.Date;
import java.util.Arrays;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.springframework.stereotype.Component;

@Component
@Entity
//@Scope(value="prototype")
public class Couple {
	
	@Id
	@GeneratedValue
	private int id;
	private int parent1;
	private int parent2;
	Date marriage;
	Date divorce;
	String note;
	String picture;
	//Integer children[];
	//@Autowired
	//Couple couples;
	
	public Couple(Integer parent1, Integer parent2) {
		this.parent1 = parent1;
		this.parent2 = parent2;
		//this.children = children;
	}
	


	public Couple() {
		System.out.println("################## Couple created "+this.toString());
	}

	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}


	public int getParent1() {
		return parent1;
	}


	public void setParent1(int parent1) {
		this.parent1 = parent1;
	}


	public int getParent2() {
		return parent2;
	}


	public void setParent2(int parent2) {
		this.parent2 = parent2;
	}

	public Date getMarriage() {
		return marriage;
	}
	public void setMarriage(Date marriage) {
		this.marriage = marriage;
	}
	public Date getDivorce() {
		return divorce;
	}


	public void setDivorce(Date divorce) {
		this.divorce = divorce;
	}


	public String getNote() {
		return note;
	}


	public void setNote(String note) {
		this.note = note;
	}


	public String getPicture() {
		return picture;
	}


	public void setPicture(String picture) {
		this.picture = picture;
	}


	@Override
	public String toString() {
		return "Couple [id=" + id + ", parent1=" + parent1 + ", parent2=" + parent2 + ", marriage=" + marriage
				+ ", divorce=" + divorce + ", note=" + note + ", picture=" + picture  + "]";
	}
	
	
}
