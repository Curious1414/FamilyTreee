package com.ouri.tree;

import java.sql.Array;
import java.sql.Date;
import java.util.ArrayList;
import java.util.Arrays;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.springframework.stereotype.Component;

import com.ouri.tree.dao.Couple;

@Component
@Entity
//@Scope(value="prototype")
public class Person {
	
	@Id
	@GeneratedValue
	private Integer id;
	private String familyName;
	private String firstName;
	

	private String maidenName="";
	

	private boolean alive;
	
	@Enumerated(EnumType.STRING)
	private Gender gender;
	Date birth;
	Date death;
	String note;
	String picture;
	//@Autowired
	Integer couples[];
	
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

	public Person() {
		System.out.println("################## Person created "+this.toString());
	}

	public Person(String firstName, String familyName, Integer couples[]) {
		this.firstName = firstName;
		this.familyName = familyName;
		this.couples = couples;
	}
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	public Date getBirth() {
		return birth;
	}

	public void setBirth(Date birth) {
		this.birth = birth;
	}

	public Date getDeath() {
		return death;
	}

	public void setDeath(Date death) {
		this.death = death;
	}

	public String getFamilyName() {
		return familyName;
	}
	public void setFamilyName(String familyName) {
		this.familyName = familyName;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public boolean isAlive() {
		return alive;
	}
	public void setAlive(boolean alive) {
		this.alive = alive;
	}
	
	
	public String getMaidenName() {
		return maidenName;
	}

	public void setMaidenName(String maidenName) {
		this.maidenName = maidenName;
	}
	
	public void show() {
		System.out.println("###################################"+this.toString());
	}

	public Integer[] getCouples() {
		return couples;
	}

	public void setCouples(Integer[] couples) {
		this.couples = couples;
	}
	
	public Gender getGender() {
		return gender;
	}

	public void setGender(Gender gender) {
		this.gender = gender;
	}

	@Override
	public String toString() {
		return "Person [id=" + id + ", familyName=" + familyName + ", firstName=" + firstName + ", maidenName="
				+ maidenName + ", alive=" + alive + ", gender=" + gender + ", birth=" + birth + ", death=" + death
				+ ", note=" + note + ", picture=" + picture + ", couples=" + Arrays.toString(couples) + "]";
	}	
}

 enum Gender {
    MALE, 
    FEMALE
}
